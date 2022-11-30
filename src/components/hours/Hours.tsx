import { Hours as HoursType } from "@yext/types";
import { HoursTable } from "../hoursTable/HoursTable";
import { DayOfWeek } from "../hoursTable/types";
import { getDays, daysSince, yextDate, parseDate } from "./utils";

/**
 * The shape of the data passed to {@link Hours}.
 * 
 * @public
 */
export interface HoursProps {
  /** Pass through a custom closed message. */
  closedMessage?: React.ReactNode;
  /** A map for setting custom day labels. */
  dayOfWeekNames?: Partial<Record<DayOfWeek, string>>
  /**
   * Pass through to customize the message format (use {0} for starting
   * time and \{1\} for end time). Example: 'From \{0\} to \{1\}'.
   */
  format?: string;
  /** Hours data from Yext Knowledge Graph. */
  hours: HoursType;
  /** Number of days to add to the table. */
  size?: number;
  /** The day of the week to start on. */
  startOfWeek?: DayOfWeek;
}

/**
 * Renders a table of store hours based on the Yext Knowledge Graph. Example of using the component to render
 * an entity's hours from Yext Knowledge Graph:
 * ```
 * import { Hours } from "@yext/react-components";
 * 
 * const hours = (<Hours hours={props.data.document.hours} />);
 * ```
 *
 * @public
 */
export function Hours({
  closedMessage,
  dayOfWeekNames,
  format,
  hours,
  size = 7,
  startOfWeek,
}: HoursProps): JSX.Element {
  const days = getDays(size, startOfWeek);
  const offset = startOfWeek ? daysSince(startOfWeek) : 0;
  const reopenDate = hours.reopenDate && parseDate(hours.reopenDate);

  return (
    <HoursTable>
      {days.map((key, i) => {
        const date = new Date();
        const relativeDays = i - offset;
        date.setDate(date.getDate() + relativeDays);

        const isTempClosed = reopenDate && reopenDate.getTime() > date.getTime();
        const isHoliday = hours.holidayHours?.find((holiday) => holiday.date === yextDate(date));
        const day = isHoliday ? isHoliday : hours[key];

        if (!day) {
          return;
        }

        return (
          <HoursTable.Day
            dayOfWeek={key}
            isClosed={isTempClosed || day.isClosed}
            closedMessage={closedMessage}
            label={dayOfWeekNames ? dayOfWeekNames?.[key] : undefined}
            key={date.getTime()}
          >
            {day.openIntervals.map((interval) => (
              <HoursTable.Interval
                {...interval}
                format={format}
                key={interval.start + "-" + interval.end}
              />
            ))}
          </HoursTable.Day>
        );
      })}
    </HoursTable>
  );
}
