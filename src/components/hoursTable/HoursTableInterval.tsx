import { format, parseTime } from "./utils";
import { LocalizeTime } from "./types";

/**
 * The shape of the data passed to {@link HoursTableInterval}.
 */
export interface HoursTableIntervalProps {
  /** starting time (in HH:MM format) */
  start?: string;
  /** end time (in HH:MM format) */
  end?: string;
  /** A pass through object to configure the localized time format */
  localize?: LocalizeTime
  /** Customize the message format (use {0} for starting time and {1} for end time) */
  format?: string;
}

/**
 * A sub component of {@link HoursTable} that renders a continuous period of time that a
 * location may be open, based from the Yext Knowledge Graph.
 * 
 * @public 
 */
export default function HoursTableInterval(props: HoursTableIntervalProps) {
  const start = parseTime(props.start, props.localize);
  const end = parseTime(props.end, props.localize);

  return (
    <div>
      {props.format ? format(props.format, start, end) : `${start} – ${end}`}
    </div>
  )
}
