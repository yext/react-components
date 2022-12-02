import { ComponentMeta, Story } from "@storybook/react";
import { Hours, HoursProps } from "../../src/components/hours/Hours";
import {
  HOURS,
  HOURS_WITH_HOLIDAY,
  HOURS_WITH_REOPEN_DATE,
} from "../__fixtures__/km/hours";

const meta: ComponentMeta<typeof Hours> = {
  title: "Hours",
  component: Hours,
};

export default meta;

export const Primary: Story<HoursProps> = (args) => {
  return <Hours {...args} />;
};
Primary.args = {
  format: "From {0} to {1}",
  hours: HOURS,
  startOfWeek: "monday",
};

export const Holiday = Primary.bind({});
Holiday.args = {
  dayOfWeekNames: {
    thursday: "Thanksgiving",
  },
  closedMessage: "Closed Today",
  hours: HOURS_WITH_HOLIDAY,
  startOfWeek: "monday",
};

export const TemporarilyClosed = Primary.bind({});
TemporarilyClosed.args = {
  closedMessage: "Temporarily Closed",
  hours: HOURS_WITH_REOPEN_DATE,
  startOfWeek: "sunday",
};
