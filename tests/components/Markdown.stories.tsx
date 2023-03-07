import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Markdown } from "../../src/components/Markdown";

const meta: ComponentMeta<typeof Markdown> = {
  title: "Markdown",
  component: Markdown,
};
export default meta;

export const Primary: ComponentStory<typeof Markdown> = (args) => (
  <Markdown {...args} />
);
Primary.args = {
  content: "# ~~Hello~~, *world*!",
};
