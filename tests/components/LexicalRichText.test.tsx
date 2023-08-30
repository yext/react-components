import { LexicalRichText } from "../../src/components/richText/LexicalRichText";
import { render, screen } from "@testing-library/react";
import { LEXICAL_RICH_TEXT_SERIALIZED_AST } from "../__fixtures__/km/lexicalRichText";

it("renders embedded key correctly", () => {
  render(<LexicalRichText 
    serializedAST={JSON.stringify(LEXICAL_RICH_TEXT_SERIALIZED_AST)} 
    />);
  const renderedElement = screen.getByText("Name");

  expect(renderedElement.tagName).toBe("SPAN");
  expect(renderedElement.className).toBe(
    "no-underline \
       text-xs \
       not-italic \
       bg-gray-600 \
       font-light \
       inline \
       whitespace-no-wrap \
       rounded-sm \
       box-content \
       text-white \
       pt-0.5 \
       pr-1 \
       pb-0.5 \
       pl-1 \
       rounded");
});
