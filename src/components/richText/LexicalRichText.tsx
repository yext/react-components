import {
  LexicalComposer,
  InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HashtagNode } from "@lexical/hashtag";
import { EditorThemeClasses } from "lexical";
import DefaultNodeStyling from "./DefaultStyling";
import { ImageNode } from "./imageNode";

/**
 * The shape of data passed to {@link LexicalRichText}.
 */
export interface LexicalRichTextProps {
  /** A JSON-serialized Lexical Dev AST. */
  serializedAST: string;
  /** CSS Class names for the various Lexical Node types. */
  nodeClassNames?: EditorThemeClasses;
}

/**
 * Renders a read-only view of a Lexical Rich Text field. Styling for the various
 * types of Rich Text element can be optionally provided. If not provided, Yext default
 * styling will be applied.
 */
export function LexicalRichText({
  serializedAST,
  nodeClassNames,
}: LexicalRichTextProps) {
  return (
    <LexicalComposer
      initialConfig={generateConfig(serializedAST, nodeClassNames)}
    >
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        ErrorBoundary={LexicalErrorBoundary}
        placeholder={<div></div>}
      />
      <ListPlugin />
    </LexicalComposer>
  );
}

/**
 * Configuration for the Lexical Editor that powers the {@link LexicalComposer}. There is
 * some additional configuration (error handling, theme) specifically for this Component itself.
 */
function generateConfig(
  editorState: string,
  theme?: EditorThemeClasses
): InitialConfigType {
  return {
    namespace: "",
    editable: false,
    onError: (error) => {
      throw error;
    },
    editorState: editorState,
    theme: theme ?? DefaultNodeStyling,
    nodes: [
      HeadingNode,
      HashtagNode,
      ImageNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
      HorizontalRuleNode,
    ],
  };
}
