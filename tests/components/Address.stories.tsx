import { ComponentMeta, Story } from "@storybook/react";
import { Address, AddressProps } from "../../src/components/Address/Address";
import { US_ADDRESS, BR_ADDRESS } from "../__fixtures__/km/address";

const meta: ComponentMeta<typeof Address> = {
  title: "Address",
  component: Address,
};

export default meta;

export const Primary: Story<AddressProps> = (args) => {
  return <Address {...args} />;
};

Primary.args = {
  address: US_ADDRESS,
};

export const Brazil: Story<AddressProps> = (args) => {
  return <Address {...args} />;
};

Brazil.args = {
  address: BR_ADDRESS,
};
