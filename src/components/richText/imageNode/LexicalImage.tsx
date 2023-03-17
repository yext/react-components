import { useMemo } from "react";

interface LexicalImageProps {
  src: string;
  altText: string;
  maxWidth: number;
  width: "inherit" | number;
  height: "inherit" | number;
}

/**
 * Responsible for rendering a Lexical Dev {@link ImageNode} in the DOM. Currently, the Component is
 * little more than a wrapper over an img tag. However, more advanced keyboard interactions may be
 * added to the Component in future.
 */
export default function LexicalImage({
  src,
  altText,
  width,
  height,
  maxWidth,
}: LexicalImageProps): JSX.Element {
  const style = useMemo(() => {
    return { height, width, maxWidth };
  }, [height, width, maxWidth]);

  return <img src={src} alt={altText} style={style} />;
}
