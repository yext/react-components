import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LexicalRichText } from "../../src/components/richText/LexicalRichText";
import { LEXICAL_RICH_TEXT_SERIALIZED_AST } from "../__fixtures__/km/lexicalRichText";

const meta: ComponentMeta<typeof LexicalRichText> = {
  title: "Lexical Rich Text",
  component: LexicalRichText,
};
export default meta;

export const Primary: ComponentStory<typeof LexicalRichText> = (args) => (
  <LexicalRichText {...args} />
);
Primary.args = {
  serializedAST: JSON.stringify(LEXICAL_RICH_TEXT_SERIALIZED_AST),
};
