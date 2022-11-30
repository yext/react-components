import { ComponentMeta, Story } from "@storybook/react";
import { Hours, HoursProps } from "../../src/components/hours/Hours";
import { HOURS, HOURS_WITH_HOLIDAY, HOURS_WITH_REOPEN_DATE } from "../__fixtures__/km/hours";

const meta: ComponentMeta<typeof Hours> = {
  title: "Hours",
  component: Hours,
};

export default meta;

export const Primary: Story<Partial<HoursProps>> = (args) => {
  return (
    <Hours hours={HOURS} {...args} />
  );
};
Primary.args = {
  closedMessage: '',
  dayOfWeekNames: {},
  format: 'From {0} to {1}',
  size: 7,
  startOfWeek: 'monday',
}

export const Holiday: Story<Partial<HoursProps>> = (args) => {
  return (
    <Hours hours={HOURS_WITH_HOLIDAY} {...args} />
  );
};
Holiday.args = {
  dayOfWeekNames: {
    'thursday': 'Thanksgiving',
  },
  closedMessage: 'Closed Today',
  format: '',
  size: 7,
  startOfWeek: 'monday',
}

export const TemporarilyClosed: Story<Partial<HoursProps>> = (args) => {
  return (
    <Hours hours={HOURS_WITH_REOPEN_DATE} {...args} />
  );
};
TemporarilyClosed.args = {
  closedMessage: 'Temporarily Closed',
  dayOfWeekNames: {},
  format: '',
  size: 7,
  startOfWeek: 'sunday',
}
