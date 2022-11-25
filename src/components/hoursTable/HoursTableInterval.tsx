import { format, parseTime } from "./utils";

export interface HoursTableIntervalProps {
  start?: string;
  end?: string;
  toLocaleTimeString?: [
    Intl.LocalesArgument,
    Intl.DateTimeFormatOptions
  ];
  format?: string;
}

export default function HoursTableInterval(props: HoursTableIntervalProps) {
  const start = parseTime(props.start, props.toLocaleTimeString);
  const end = parseTime(props.end, props.toLocaleTimeString);

  return (
    <div>
      {props.format ? format(props.format, start, end) : `${start} – ${end}`}
    </div>
  )
}
