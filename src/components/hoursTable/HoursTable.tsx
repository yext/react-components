import HoursTableDay from "./HoursTableDay";
import HoursTableInterval from "./HoursTableInterval";

/**
 * The shape of the data passed to {@link HoursTable}.
 */
export interface HoursTableProps {
  children: React.ReactNode;
}

/**
 * A compound component that can represent a list of store hours by day of week. It is
 * most often used through an additional Hours component, which constructs the table
 * based on the Yext Knowledge Graph.
 * Example of constructing your own table:
 * ```
 * 
 * import { HoursTable } from "@yext/react-components";
 * 
 * const hours = (
 *  <HoursTable>
 *    <HoursTable.Day dayOfWeek="monday">
 *      <HoursTable.Interval start="9:00" end="17:00" />
 *    </HoursTable.Day>
 *    ...
 *  </HoursTable>
 * );
 * ```
 * 
 * @public
 */
function HoursTable(props: HoursTableProps): JSX.Element {
  return (
    <div>
      {props.children}
    </div>
  );
}

HoursTable.Day = HoursTableDay;
HoursTable.Interval = HoursTableInterval;

export {
  HoursTable
};