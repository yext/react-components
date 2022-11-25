import { DayOfWeek } from "./types";
import { toCapitalCase } from "./utils";

export interface HoursTableDayProps {
  label?: React.ReactNode;
  dayOfWeek: DayOfWeek;
  isClosed?: boolean;
  closedMessage?: React.ReactNode;
  children: React.ReactChild | React.ReactChild[];
}

export default function HoursTableDay(props: HoursTableDayProps) {
  const status = props.isClosed
    ? props.closedMessage
    : props.children;

  const label = props.label || toCapitalCase(props.dayOfWeek);

  return (
    <>
      <div>
        {label}
      </div>
      <div>
        {status}
      </div>
    </>
  );
}