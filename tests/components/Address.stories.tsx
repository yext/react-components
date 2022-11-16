import { ComponentMeta } from "@storybook/react";
import { Address, AddressProps } from "../../src/components/Address/Address";
import { US_ADDRESS, BR_ADDRESS } from "../__fixtures__/km/address";

const meta: ComponentMeta<typeof Address> = {
  title: "Address",
  component: Address,
};

export default meta;

export const Primary = (args: Partial<AddressProps>) => {
  return <Address address={US_ADDRESS} {...args} />;
};

export const Brazil = (args: Partial<AddressProps>) => {
  return <Address address={BR_ADDRESS} {...args} />;
};
