import HoursTableDay from "./HoursTableDay";
import HoursTableInterval from "./HoursTableInterval";

export interface HoursTableProps {
  children: React.ReactChild | React.ReactChild[];
}

function HoursTable(props: HoursTableProps) {
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