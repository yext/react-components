import ReactMarkdown, { PluggableList } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

// The Remark and Rehype plugins to use in conjunction with ReactMarkdown.
const unifiedPlugins: { remark: PluggableList; rehype: PluggableList } = {
  remark: [remarkGfm],
  rehype: [rehypeRaw, rehypeSanitize],
};

export interface MarkdownProps {
  /** Stringified Github-Flavored Markdown. */
  content: string;
}

/**
 * Renders Github-Flavored Markdown from the Knowledge Graph. This Markdown can include
 * arbitrary HTML. Any HTML will be sanitized according to Rehype's default Schema.
 */
export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={unifiedPlugins.remark}
      rehypePlugins={unifiedPlugins.rehype}
    />
  );
}
