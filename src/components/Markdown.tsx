import ReactMarkdown, { PluggableList } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { useMemo } from "react";
export interface MarkdownProps {
  /** Stringified Github-Flavored Markdown. */
  content: string;
}

/**
 * Renders Github-Flavored Markdown from the Knowledge Graph. This Markdown can include
 * arbitrary HTML. Any HTML will be sanitized according to Rehype's default Schema.
 */
export function Markdown({ content }: MarkdownProps) {
  const plugins = useMemo(() => {
    const unifiedPlugins: { remark: PluggableList; rehype: PluggableList } = {
      remark: [remarkGfm],
      rehype: [rehypeRaw, rehypeSanitize],
    };

    return unifiedPlugins;
  }, []);

  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={plugins.remark}
      rehypePlugins={plugins.rehype}
    />
  );
}
