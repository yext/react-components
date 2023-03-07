import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { Options } from "rehype-sanitize";
import { useMemo } from "react";
import { PluggableList } from "unified";

export interface MarkdownProps {
  /** Stringified Github-Flavored Markdown. */
  content: string;
  /** HTML Sanitization Schema for use with Rehype. */
  sanitizationSchema?: Options;
}

/**
 * Renders Github-Flavored Markdown from the Knowledge Graph. This Markdown can include
 * arbitrary HTML. Any HTML will be sanitized according to the provided Rehype Schema. If
 * no Schema is provided, Rehype's default will be used.
 */
export function Markdown({ content, sanitizationSchema }: MarkdownProps) {
  const plugins = useMemo(() => {
    const unifiedPlugins: { remark: PluggableList; rehype: PluggableList } = {
      remark: [remarkGfm],
      rehype: [rehypeRaw],
    };

    if (sanitizationSchema) {
      unifiedPlugins.rehype.push([
        rehypeSanitize,
        { options: sanitizationSchema },
      ]);
    } else {
      unifiedPlugins.rehype.push(rehypeSanitize);
    }

    return unifiedPlugins;
  }, [sanitizationSchema]);

  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={plugins.remark}
      rehypePlugins={plugins.rehype}
    />
  );
}
