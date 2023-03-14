import { EditorThemeClasses } from "lexical";

/**
 * Default styling to apply to the different types of Lexical Rich Text
 * Elements.
 */
const DefaultNodeStyling: EditorThemeClasses = {
  paragraph: "mb-2 relative",
  link: "text-blue-500",
  heading: {
    h1: "text-2xl",
  },
  text: {
    code: "bg-slate-200",
  },
  list: {
    ul: "ml-4 list-disc",
    listitem: "mx-2",
  },
  quote: "text-gray-400 border-l-4 border-gray-300 pl-4",
  table: "w-8/12",
  tableCellHeader: "bg-slate-200 px-2 py-2 border-2 border-black",
  tableCell: "border-2 border-black",
};

export default DefaultNodeStyling;
