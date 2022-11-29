import { format, parseTime } from "./utils";
import { LocalizeTime } from "./types";

/**
 * The shape of the data passed to {@link HoursTableInterval}.
 */
export interface HoursTableIntervalProps {
  /** Starting time (in HH:MM format). */
  start?: string;
  /** End time (in HH:MM format). */
  end?: string;
  /** A pass through object to configure the localized time . */
  localize?: LocalizeTime
  /**
   * Customize the message format (use {0} for starting time and {1} for end time).
   * Example: 'From {0} to {1}'.
   */
  format?: string;
}

/**
 * A sub component of {@link HoursTable} that renders a continuous period of time that a
 * location may be open, based on the Yext Knowledge Graph.
 * 
 * @public 
 */
export default function HoursTableInterval(props: HoursTableIntervalProps): JSX.Element {
  const start = parseTime(props.start, props.localize);
  const end = parseTime(props.end, props.localize);

  return (
    <div>
      {props.format ? format(props.format, start, end) : `${start} – ${end}`}
    </div>
  )
}
