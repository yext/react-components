import { render, screen } from "@testing-library/react";
import { HoursTable } from "../../src/components/hoursTable";
import { format, parseTime, toCapitalCase } from "../../src/components/hoursTable/utils";

describe("HoursTable", () => {
  it("properly wraps HoursTable.Day", () => {
    render(
      <HoursTable>
        <HoursTable.Day dayOfWeek="thursday">
          <HoursTable.Interval start="9:00" end="18:00" />
        </HoursTable.Day>
      </HoursTable>
    );

    const label = screen.getByText("Thursday");
    const interval = screen.getByText("9:00 AM – 6:00 PM");
    expect(label && interval).toBeTruthy();
  });

  it("properly wraps multiple HoursTable.Day", () => {
    render(
      <HoursTable>
        <HoursTable.Day dayOfWeek="thursday">
          <HoursTable.Interval start="9:00" end="18:00" />
        </HoursTable.Day>
        <HoursTable.Day dayOfWeek="friday">
          <HoursTable.Interval start="9:00" end="18:00" />
        </HoursTable.Day>
      </HoursTable>
    );

    const thurs = screen.getByText("Thursday");
    const fri = screen.getByText("Friday");
    expect(thurs && fri).toBeTruthy();
  });
});

describe("HoursTable.Day", () => {
  it("properly renders a single day with interval", () => {
    render(
      <HoursTable.Day dayOfWeek="thursday">
        <HoursTable.Interval start="9:00" end="18:00" />
      </HoursTable.Day>
    );

    const label = screen.getByText("Thursday");
    const interval = screen.getByText("9:00 AM – 6:00 PM");
    expect(label && interval).toBeTruthy();
  });

  it("properly renders a single day with custom label and child", () => {
    render(
      <HoursTable.Day dayOfWeek="thursday" label="Birthday">
        All Day
      </HoursTable.Day>
    );

    const label = screen.getByText("Birthday");
    const interval = screen.getByText("All Day");
    expect(label && interval).toBeTruthy();
  });

  it("properly renders a closed day", () => {
    render(
      <HoursTable.Day dayOfWeek="thursday" isClosed closedMessage="Closed">
        <HoursTable.Interval start="9:00" end="18:00" />
      </HoursTable.Day>
    );

    const interval = screen.getByText("Closed");
    expect(interval).toBeTruthy();
  });
});

describe("HoursTable.Interval", () => {
  it("properly renders an interval message", () => {
    render(
      <HoursTable.Interval start="9:00" end="18:00" />
    );

    const label = screen.getByText("9:00 AM – 6:00 PM");
    expect(label).toBeTruthy();
  });

  it("properly renders with a custom message format", () => {
    render(
      <HoursTable.Interval
        start="9:00"
        end="18:00"
        format="From {0} to {1}."
      />
    );

    const label = screen.getByText("From 9:00 AM to 6:00 PM.");
    expect(label).toBeTruthy();
  });

  it("properly renders with twenty four hour clock", () => {
    render(
      <HoursTable.Interval
        start="9:00"
        end="18:00"
        localize={{
          locales: 'en-us',
          options: { hour: "numeric", minute: "numeric", hour12: false }
        }}
      />
    );

    const label = screen.getByText("09:00 – 18:00");
    expect(label).toBeTruthy();
  });
});

describe("format", () => {
  const message = "The quick {0} jumps over the lazy {1}.";

  it("properly formats with multiple arguments", () => {
    const expected = "The quick fox jumps over the lazy dog.";
    const actual = format(message, "fox", "dog");

    expect(actual).toBe(expected);
  });

  it("properly formats with one argument", () => {
    const expected = "The quick fox jumps over the lazy {1}.";
    const actual = format(message, "fox");

    expect(actual).toBe(expected);
  });

  it("properly formats with no arguments", () => {
    const expected = "The quick {0} jumps over the lazy {1}.";
    const actual = format(message);

    expect(actual).toBe(expected);
  });
});

describe("parseTime", () => {
  it("transforms Yext Time string to a JS localized time string", () => {
    const actual = parseTime("09:00");
    const expected = "9:00 AM";

    expect(actual).toBe(expected);
  });

  it("returns a custom JS localized time string", () => {
    const actual = parseTime("18:00", { locales: 'en-us', options: { hour12: false, hour: 'numeric', minute: 'numeric' }});
    const expected = "18:00";

    expect(actual).toBe(expected);
  });

  it("throws an error when trying to parse an invalid Yext time", () => {
    const logMock = jest.spyOn(console, "error").mockImplementation();

    expect(logMock).not.toBeCalled();
    parseTime("invalidTime");
    expect(logMock).toBeCalledTimes(1);
    expect(logMock).toBeCalledWith("Invalid time format, must be 'HH:MM'");
    logMock.mockRestore();
  })
});

describe("toCapitalCase", () => {
  it("capitalizes the first character in a string", () => {
    const actual = toCapitalCase("yext");
    const expected = "Yext";

    expect(actual).toBe(expected);
  })
})
