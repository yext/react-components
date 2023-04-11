import { render, screen } from "@testing-library/react";
import { Markdown } from "../../src/components/Markdown";

it("wraps normal text in <p> tag", () => {
  render(<Markdown content="normal text" />);
  const renderedElement = screen.getByText("normal text");

  expect(renderedElement.tagName).toBe("P");
});

it("wraps bold text in a <strong> tag", () => {
  render(<Markdown content="**bold text**" />);
  const renderedElement = screen.getByText("bold text");

  expect(renderedElement.tagName).toBe("STRONG");
});

it("wraps italicized text in an <em> tag", () => {
  render(<Markdown content="*italic text*" />);
  const renderedElement = screen.getByText("italic text");

  expect(renderedElement.tagName).toBe("EM");
});

it("wraps striken through text in a <del> tag", () => {
  render(<Markdown content="~~strikethrough text~~" />);
  const renderedElement = screen.getByText("strikethrough text");

  expect(renderedElement.tagName).toBe("DEL");
});

it("renders bolded, striken-through text properly", () => {
  render(<Markdown content="~~**strikethrough text**~~" />);
  const renderedElement = screen.getByText("strikethrough text");

  expect(renderedElement.tagName).toBe("STRONG");
  // eslint-disable-next-line testing-library/no-node-access
  expect(renderedElement.parentElement?.tagName).toBe("DEL");
});

it("wraps quotes in a <blockquote> element", () => {
  render(<Markdown content="> quote" />);
  const renderedElement = screen.getByText("quote");

  // eslint-disable-next-line testing-library/no-node-access
  expect(renderedElement.parentElement?.tagName).toBe("BLOCKQUOTE");
});

describe("renders Headings properly", () => {
  it("wraps first-level heading in a <h1> tag", () => {
    render(<Markdown content="# Heading 1" />);
    const renderedElement = screen.getByText("Heading 1");

    expect(renderedElement.tagName).toBe("H1");
  });

  it("wraps second-level heading in a <h2> tag", () => {
    render(<Markdown content="## Heading 2" />);
    const renderedElement = screen.getByText("Heading 2");

    expect(renderedElement.tagName).toBe("H2");
  });

  it("wraps third-level heading in a <h3> tag", () => {
    render(<Markdown content="### Heading 3" />);
    const renderedElement = screen.getByText("Heading 3");

    expect(renderedElement.tagName).toBe("H3");
  });
});

describe("renders code properly", () => {
  it("wraps in-line code in a <code> tag", () => {
    render(<Markdown content="`code line`" />);
    const renderedElement = screen.getByText("code line");

    expect(renderedElement.tagName).toBe("CODE");
  });

  it("wraps code block in a <code> tag", () => {
    render(<Markdown content="```code line```" />);
    const renderedElement = screen.getByText("code line");

    expect(renderedElement.tagName).toBe("CODE");
  });
});

describe("renders lists properly", () => {
  it("renders bullet list properly", () => {
    const content = "- Item 1\n - Item 2";
    render(<Markdown content={content} />);
    const firstElement = screen.getByText("Item 1");
    const secondElement = screen.getByText("Item 2");

    expect(firstElement.tagName).toBe("LI");
    expect(secondElement.tagName).toBe("LI");
    // eslint-disable-next-line testing-library/no-node-access
    expect(firstElement.parentElement?.tagName).toBe("UL");
  });

  it("renders number list properly", () => {
    const content = "1. Item 1\n 2. Item 2";
    render(<Markdown content={content} />);
    const firstElement = screen.getByText("Item 1");
    const secondElement = screen.getByText("Item 2");

    expect(firstElement.tagName).toBe("LI");
    expect(secondElement.tagName).toBe("LI");
    // eslint-disable-next-line testing-library/no-node-access
    expect(firstElement.parentElement?.tagName).toBe("OL");
  });
});
