import { DayOfWeek } from "./types";
import { toCapitalCase } from "./utils";

/**
 * The shape of the data passed to {@link HoursTableDay}.
 */
export interface HoursTableDayProps {
  /** Set a custom label for the day of week. */
  label?: React.ReactNode;
  /** The day of the week to fetch hours for. */
  dayOfWeek: DayOfWeek;
  /** If marked closed for the day. */
  isClosed?: boolean;
  /** Set a custom message for the hours of operation for a particular day. */
  closedMessage?: React.ReactNode;
}

/**
 * A sub component of {@link HoursTable} that renders a particular day (represented as a row) in the table.
 *
 * @public
 */
export default function HoursTableDay(
  props: React.PropsWithChildren<HoursTableDayProps>
): JSX.Element {
  const status = props.isClosed ? props.closedMessage : props.children;

  const label = props.label || toCapitalCase(props.dayOfWeek);

  return (
    <div className="flex">
      <div className="flex-[0_0_128px]">{label}</div>
      <div className="flex-[0_0_256px] flex flex-col">{status}</div>
    </div>
  );
}
