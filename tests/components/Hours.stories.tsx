import { ComponentMeta, Story } from "@storybook/react";
import { Hours, HoursProps } from "../../src/components/hours/Hours";
import { HOURS, HOURS_WITH_HOLIDAY, HOURS_WITH_REOPEN_DATE } from "../__fixtures__/km/hours";

const meta: ComponentMeta<typeof Hours> = {
  title: "Hours",
  component: Hours,
};

export default meta;

export const Primary: Story<HoursProps> = (args) => {
  return (
    <Hours {...args} />
  );
};
Primary.args = {
  closedMessage: '',
  dayOfWeekNames: {},
  format: 'From {0} to {1}',
  hours: HOURS,
  size: 7,
  startOfWeek: 'monday',
}

export const Holiday = Primary.bind({});
Holiday.args = {
  dayOfWeekNames: {
    'thursday': 'Thanksgiving',
  },
  closedMessage: 'Closed Today',
  format: '',
  hours: HOURS_WITH_HOLIDAY,
  size: 7,
  startOfWeek: 'monday',
}

export const TemporarilyClosed = Primary.bind({});
TemporarilyClosed.args = {
  closedMessage: 'Temporarily Closed',
  dayOfWeekNames: {},
  format: '',
  hours: HOURS_WITH_REOPEN_DATE,
  size: 7,
  startOfWeek: 'sunday',
}
