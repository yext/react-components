import { EditorThemeClasses } from "lexical";

/**
 * Tailwind styling for the different Tokens that can occur within a Code Block.
 * Token Types come from the PrismJS library, which Lexical uses to power Code Blocks.
 * The Types include Comment, Variable, Operator, etc.
 */
const attributeTokenStyles = "text-sky-700";
const propertyTokenStyles = "text-pink-800";
const commentTokenStyles = "text-slate-500";
const functionTokenStyles = "text-rose-500";
const selectorTokenStyles = "text-lime-600";
const variableTokenStyles = "text-amber-500";
const operatorTokenStyles = "text-yellow-700";
const punctuationTokenStyles = "text-neutral-400";

/**
 * Default styling to apply to the different types of Lexical Rich Text
 * Elements.
 */
const DefaultNodeStyling: EditorThemeClasses = {
  paragraph: "m-0 mb-2 relative",
  link: "text-blue-500",
  heading: {
    h1: "text-2xl font-normal m-0 mb-3 p-0",
    h2: "text-sm text-gray-600 font-bold m-0 mt-2 p-0 uppercase",
    h3: "text-xs m-0 uppercase font-bold"
  },
  text: {
    code: "bg-slate-200 p-0.5",
    underline: "underline",
    strikethrough: "line-through",
    underlineStrikethrough: "[text-decoration:underline_line-through]"
  },
  list: {
    ul: "p-0 m-0 ml-4 list-disc",
    ol: "p-0 m-0 ml-4, list-decimal",
    listitem: "mx-8 my-2",
  },
  code: "bg-gray-100 block text-xs m-0 mt-2 mb-2 overflow-x-auto relative p-2",
  codeHighlight: {
    atrule: attributeTokenStyles,
    attr: attributeTokenStyles,
    boolean: propertyTokenStyles,
    builtin: selectorTokenStyles,
    cdata: commentTokenStyles,
    char: selectorTokenStyles,
    class: functionTokenStyles,
    comment: commentTokenStyles,
    constant: propertyTokenStyles,
    deleted: propertyTokenStyles,
    doctype: commentTokenStyles,
    entity: operatorTokenStyles,
    function: functionTokenStyles,
    important: variableTokenStyles,
    inserted: selectorTokenStyles,
    keyword: attributeTokenStyles,
    namespace: variableTokenStyles,
    number: propertyTokenStyles,
    operator: operatorTokenStyles,
    prolog: commentTokenStyles,
    property: propertyTokenStyles,
    punctuation: punctuationTokenStyles,
    regex: variableTokenStyles,
    selector: selectorTokenStyles,
    string: selectorTokenStyles,
    symbol: propertyTokenStyles,
    tag: propertyTokenStyles,
    url: operatorTokenStyles,
    variable: variableTokenStyles
  },
  quote: "m-0 ml-5 text-sm text-gray-500 border-l-4 pl-4",
  table: "w-11/12 max-w-full overflow-y-scroll my-7",
  tableCellHeader: "bg-gray-200 text-start",
  tableCell: "p-2 align-top relative border border-gray-400",
};

export default DefaultNodeStyling;
