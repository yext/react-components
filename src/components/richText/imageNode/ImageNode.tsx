import {
  $applyNodeReplacement,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  DecoratorNode,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";

import * as React from "react";

import LexicalImage from "./LexicalImage";

/**
 * The raw Object obtained when first parsing a serialized {@link ImageNode}.
 */
export type SerializedImageNode = Spread<
  {
    altText: string;
    height?: number;
    maxWidth: number;
    src: string;
    width?: number;
    type: "image";
    version: 1;
  },
  SerializedLexicalNode
>;

/**
 * Defines a Lexical Dev {@link DecoratorNode} for images.
 */
export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __width: "inherit" | number;
  __height: "inherit" | number;
  __maxWidth: number;

  constructor(
    src: string,
    altText: string,
    maxWidth: number,
    width?: "inherit" | number,
    height?: "inherit" | number,
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__maxWidth = maxWidth;
    this.__width = width || "inherit";
    this.__height = height || "inherit";
  }

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__maxWidth,
      node.__width,
      node.__height,
      node.__key
    );
  }

  getSrc(): string {
    const latest = this.getLatest();
    return latest.__src;
  }

  getAltText(): string {
    const latest = this.getLatest();
    return latest.__altText;
  }

  setWidthAndHeight(
    width: "inherit" | number,
    height: "inherit" | number
  ): void {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  /**
   * Defines the JSON Serialization strategy for an {@link ImageNode}.
   */
  exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      height: this.__height === "inherit" ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      src: this.getSrc(),
      type: "image",
      version: 1,
      width: this.__width === "inherit" ? 0 : this.__width,
    };
  }

  /**
   * Static constructor for creating an {@link ImageNode} from a JSON serialized Node.
   */
  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { altText, height, width, maxWidth, src } = serializedNode;

    const node: ImageNode = $applyNodeReplacement(
      new ImageNode(src, altText, maxWidth, width, height)
    );

    return node;
  }

  /**
   * Defines how this node is serialized to HTML.
   */
  exportDOM(): DOMExportOutput {
    const element = document.createElement("img");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__altText);
    return { element };
  }

  /**
   * Static constructor for creating an {@link ImageNode} from an HTML-serialized Node.
   */
  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({
        conversion: convertImageElement,
        priority: 0,
      }),
    };
  }

  /**
   * Inserts the {@link ImageNode}'s placeholder {@link HTMLElement} into the Lexical Dev's DOM.
   */
  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement("span");
    const className = config.theme.image;
    if (className) {
      span.className = className;
    }

    return span;
  }

  /**
   * Since this Node will only be used in a read-only context, we don't need to worry about
   * updating the DOM when its attributes change.
   */
  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <LexicalImage
        src={this.__src}
        altText={this.__altText}
        width={this.__width}
        height={this.__height}
        maxWidth={this.__maxWidth}
        nodeKey={this.getKey()}
      />
    );
  }
}

/**
 * Type Checker that verifies if the provided node is an {@link ImageNode}.
 */
export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}

/**
 * Converts an {@link HTMLImageElement} into an {@link ImageNode}.
 */
function convertImageElement(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLImageElement) {
    const { alt: altText, src } = domNode;
    const node: ImageNode = $applyNodeReplacement(
      new ImageNode(src, altText, 500)
    );
    return { node };
  }
  return null;
}
