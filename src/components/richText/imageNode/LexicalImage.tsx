import type { LexicalEditor, NodeKey } from "lexical";

import * as React from "react";
import { useRef, useMemo } from "react";

interface LexicalImageProps {
  src: string;
  altText: string;
  maxWidth: number;
  width: "inherit" | number;
  height: "inherit" | number;
  nodeKey: NodeKey;
  showCaption: boolean;
  captionsEnabled: boolean;
  caption: LexicalEditor;
}

export default function LexicalImage({
  src,
  altText,
  width,
  height,
  maxWidth,
}: LexicalImageProps): JSX.Element {
  const imageRef = useRef<null | HTMLImageElement>(null);

  const style = useMemo(() => {
    return { height, width, maxWidth };
  }, [height, width, maxWidth]);

  return (
    <div>
      <img src={src} alt={altText} ref={imageRef} style={style} />
    </div>
  );
}
