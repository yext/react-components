import { ComponentMeta, Story } from "@storybook/react";
import { OpenIntervals } from "@yext/types";
import { HoursTable, HoursTableProps } from "../../src/components/hoursTable/HoursTable";
import { HoursTableDayProps } from "../../src/components/hoursTable/HoursTableDay";
import { HoursTableIntervalProps } from "../../src/components/hoursTable/HoursTableInterval";
import { DayOfWeek, LocalizeTime } from "../../src/components/hoursTable/types";
import { HOURS } from "../__fixtures__/km/hours";

const meta: ComponentMeta<typeof HoursTable> = {
  title: "HoursTable",
  component: HoursTable,
};

export default meta;

export const Primary: Story<HoursTableProps> = () => {

  const getInterval = (dayOfWeek: DayOfWeek): OpenIntervals | undefined => {
    return HOURS[dayOfWeek]?.openIntervals[0];
  }

  const timeFormat: LocalizeTime = {
    locales: 'en-us',
    options: { hour: "numeric", minute: "numeric" }
  };

  return (
    <HoursTable>
      <HoursTable.Day dayOfWeek="tuesday">
        <HoursTable.Interval
          {...getInterval("tuesday")}
          localize={timeFormat}
        />
      </HoursTable.Day>
      <HoursTable.Day dayOfWeek="wednesday">
        <HoursTable.Interval
          {...getInterval("wednesday")} localize={timeFormat}
        />
      </HoursTable.Day>
      <HoursTable.Day
        label="Thanksgiving"
        dayOfWeek="thursday"
        isClosed={true}
        closedMessage="Closed For Thanksgiving"
      >
        <HoursTable.Interval
          {...getInterval("thursday")}
          localize={timeFormat}
        />
      </HoursTable.Day>
      <HoursTable.Day dayOfWeek="friday">
        <HoursTable.Interval
          {...getInterval("friday")}
          localize={timeFormat}
        />
      </HoursTable.Day>
      <HoursTable.Day dayOfWeek="saturday">
        <HoursTable.Interval
          {...getInterval("saturday")}
          localize={timeFormat}
        />
      </HoursTable.Day>
      <HoursTable.Day dayOfWeek="sunday">
        <HoursTable.Interval
          {...getInterval("sunday")}
          localize={timeFormat}
        />
      </HoursTable.Day>
      <HoursTable.Day dayOfWeek="monday">
        <HoursTable.Interval
          {...getInterval("monday")}
          localize={timeFormat}
        />
      </HoursTable.Day>
    </HoursTable>
  );
};

export const HoursTableDay: Story<HoursTableDayProps> = (args) => {
  return (
    <HoursTable.Day {...args}>
      <HoursTable.Interval
        start="9:00"
        end="18:00"
        localize={{ locales: 'en-us', options: { hour: "numeric", minute: "numeric" }}}
      />
    </HoursTable.Day>
  )
};
HoursTableDay.args = {
  dayOfWeek: "monday",
  isClosed: false,
  closedMessage: "Closed"
};

export const HoursTableInterval: Story<HoursTableIntervalProps> = (args) => {
  return (
    <HoursTable.Interval {...args} />
  )
};
HoursTableInterval.args = {
  start: "9:00",
  end: "18:00",
  localize: {
    locales: 'en-us',
    options: { hour: "numeric", minute: "numeric" }
  },
  format: 'From {0} to {1}.'
};
