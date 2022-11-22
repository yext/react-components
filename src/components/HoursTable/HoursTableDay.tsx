import { DayOfWeek } from "./types";

export interface HoursTableDayProps {
  label?: string;
  dayOfWeek: DayOfWeek;
  isClosed?: boolean;
  closedMessage?: React.ReactElement;
  children: React.ReactChild | React.ReactChild[];
}

export default function HoursTableDay(props: HoursTableDayProps) {
  const status = props.isClosed
    ? props.closedMessage
    : props.children;

  const label = props.label || props.dayOfWeek;

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