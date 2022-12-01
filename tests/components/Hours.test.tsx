import { render, screen } from "@testing-library/react";
import { Hours } from "../../src/components/hours/Hours";
import {
  daysSince,
  DAYS_OF_WEEK,
  getDays,
  yextDate,
  parseDate,
} from "../../src/components/hours/utils";
import { toCapitalCase } from "../../src/components/hoursTable/utils";
import {
  HOURS,
  HOURS_WITH_HOLIDAY,
  HOURS_WITH_REOPEN_DATE,
  INVALID_HOURS,
  UNDEFINED_HOURS,
} from "../__fixtures__/km/hours";
import { leadingZero } from "../__utils__/leadingZero";

describe("Hours", () => {
  it("properly renders an hours table", () => {
    render(<Hours hours={HOURS} />);

    DAYS_OF_WEEK.map((day) => toCapitalCase(day)).forEach((day, i) => {
      const label = screen.getByText(day);
      expect(label).toBeTruthy();

      (day === "Sunday"
        ? [`9:0${i} AM – 11:0${i} AM`, `12:0${i} PM – 6:0${i} PM`]
        : [`9:0${i} AM – 6:0${i} PM`]
      ).forEach((interval) => {
        const el = screen.getByText(interval);
        expect(el).toBeTruthy();
      });
    });
  });

  it("uses a custom day label", () => {
    render(<Hours hours={HOURS} dayOfWeekNames={{ wednesday: "Miércoles" }} />);

    const label = screen.getByText("Miércoles");
    expect(label).toBeTruthy();
  });

  it("uses a custom closed message", () => {
    render(
      <Hours
        hours={HOURS_WITH_HOLIDAY}
        closedMessage="Closed for Thanksgiving"
      />
    );

    const interval = screen.getByText("Closed for Thanksgiving");
    expect(interval).toBeTruthy();
  });

  it("only renders one day", () => {
    render(<Hours hours={HOURS} size={1} startOfWeek="monday" />);

    DAYS_OF_WEEK.map((day) => toCapitalCase(day)).forEach((day) => {
      const hasDay = !!screen.queryByText(day) && day !== "Monday";
      expect(hasDay).toBeFalsy();
    });
    const monday = screen.queryByText("Monday");
    expect(monday).toBeTruthy();
  });

  it("fails on invalid data", () => {
    const logMock = jest.spyOn(console, "error").mockImplementation();

    expect(logMock).not.toBeCalled();
    render(<Hours hours={INVALID_HOURS} />);
    expect(logMock).toBeCalledTimes(1);
    expect(logMock).toBeCalledWith("Invalid time format, must be 'HH:MM'");
  });

  it("skips over missing data", () => {
    const logMock = jest.spyOn(console, "warn").mockImplementation();

    expect(logMock).not.toBeCalled();
    render(<Hours hours={UNDEFINED_HOURS} />);

    DAYS_OF_WEEK.map((day) => toCapitalCase(day)).forEach((day) => {
      const hasDay = !!screen.queryByText(day) || day === "Monday";
      expect(hasDay).toBeTruthy();
    });
    expect(logMock).toBeCalledTimes(1);
    expect(logMock).toBeCalledWith(
      "[@yext/react-components/hours] Missing data for day: monday"
    );
  });

  it("is closed until reopenDate", () => {
    render(
      <Hours
        hours={HOURS_WITH_REOPEN_DATE}
        closedMessage="Temporarily Closed"
        size={1}
      />
    );

    const currentDay = toCapitalCase(DAYS_OF_WEEK[new Date().getDay()]);
    const label = screen.getByText(currentDay);
    const interval = screen.getByText("Temporarily Closed");
    expect(label && interval).toBeTruthy();
  });
});

describe("getDays", () => {
  it("returns a list of days with no transformations", () => {
    const days = getDays(7, "sunday");
    expect(days).toStrictEqual(DAYS_OF_WEEK);
  });

  it("returns a list of days starting with the current day", () => {
    const days = getDays(7);
    const currentDay = DAYS_OF_WEEK[new Date().getDay()];
    expect(days[0]).toBe(currentDay);
  });

  it("returns a list of days longer than one week", () => {
    const days = getDays(14, "sunday");
    expect(days.length).toBe(14);
    expect(days[0]).toBe("sunday");
    expect(days[7]).toBe("sunday");
  });
});

describe("daysSince", () => {
  it("does not offset on the 0th day", () => {
    const someSunday = new Date(2022, 10, 27);
    const difference = daysSince("sunday", someSunday);
    expect(difference).toBe(0);
  });

  it("returns number of days between startOfWeek and Date", () => {
    const someWednesday = new Date(2022, 10, 30);
    const past = daysSince("sunday", someWednesday);
    expect(past).toBe(3);
    const present = daysSince("wednesday", someWednesday);
    expect(present).toBe(0);
    const future = daysSince("friday", someWednesday);
    expect(future).toBe(-2);
  });
});

describe("yextDate", () => {
  it("transforms a Date object to YYYY-MM-DD format", () => {
    const date = yextDate(new Date(2022, 10, 30));
    expect(date).toBe("2022-11-30");
  });

  it("transforms a Date object to YYYY-MM-DD format, when MM < 10", () => {
    const date = yextDate(new Date(2022, 0, 30));
    expect(date).toBe("2022-01-30");
  });

  it("transforms a Date object to YYYY-MM-DD format, when DD < 10", () => {
    const date = yextDate(new Date(2022, 10, 3));
    expect(date).toBe("2022-11-03");
  });

  it("returns the current date as a Yext date", () => {
    const yext = yextDate();
    const date = parseDate(yext);
    const yyyy = date?.getFullYear();
    const mm = date && date.getMonth() + 1;
    const dd = date?.getDate();
    expect(yext).toBe(`${yyyy}-${leadingZero(mm)}-${leadingZero(dd)}`);
  });
});

describe("parseDate", () => {
  it("transforms YYYY-MM-DD to a Date object", () => {
    const date = parseDate("2022-11-30");
    const yyyy = date?.getFullYear();
    const mm = date && date.getMonth() + 1;
    const dd = date?.getDate();
    expect(yyyy).toBe(2022);
    expect(mm).toBe(11);
    expect(dd).toBe(30);
  });

  it("fails to parse when invalid date", () => {
    const logMock = jest.spyOn(console, "error").mockImplementation();
    expect(logMock).not.toBeCalled();
    parseDate("2022-11");
    expect(logMock).toBeCalledTimes(1);
    expect(logMock).toBeCalledWith("Invalid date format, must be 'YYYY-MM-DD'");
  });
});
