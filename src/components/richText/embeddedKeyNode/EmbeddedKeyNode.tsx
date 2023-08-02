import {
  TextModeType,
  EditorConfig,
  TextNode, 
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";

/**
 * The raw Object obtained when first parsing a serialized {@link EmbeddedKeyNode}.
 */
export type SerializedEmbeddedKeyNode = Spread<
  {
    text: string,
    rawText: string,
    format: number,
    style: string,
    mode: TextModeType,
    detail: number,
    type: "embedkey",
    version: 1,
  },
  SerializedLexicalNode
>;

/**
 * Defines a Lexical Dev {@link TextNode} that supports embedded keys in Rich Text. 
 * This Node is meant to be used with a read-only Lexical Editor. As such, it does 
 * not have setters for its various attributes.
 */
export class EmbeddedKeyNode extends TextNode {
  constructor(
    text: string, 
    rawText: string, 
    key?: NodeKey
  ) {
    super(text, key);
    this.__text = text;
    this.__rawText = rawText;
  }

  static getType(): string {
    return "embedkey";
  }

  static clone(node: EmbeddedKeyNode): EmbeddedKeyNode {
    return new EmbeddedKeyNode(node.__text, node.__rawText, node.__key);
  }

  /**
   * Inserts the {@link EmbeddedKeyNode}'s placeholder {@link HTMLElement} into the Lexical Dev's DOM.
   * TODO: Completely emulate embedded key styling in entitiesstorm
   */
  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config);
    dom.className = 
      "no-underline \
       text-xs \
       not-italic \
       bg-gray-600 \
       font-light \
       inline \
       whitespace-no-wrap \
       rounded-sm \
       box-content \
       text-white \
       pt-0.5 \
       pr-1 \
       pb-0.5 \
       pl-1 \
       rounded";

    return dom;
  }

  /**
   * Since this Node will only be used in a read-only context, we don't need to worry about
   * updating the DOM when its attributes change.
   */
  updateDOM(): false {
    return false;
  }

  /**
   * Static constructor for creating an {@link EmbeddedKeyNode} from a JSON serialized Node.
   */
  static importJSON(serializedNode: SerializedEmbeddedKeyNode): EmbeddedKeyNode {
    const {text, rawText} = serializedNode;
    return $createEmbeddedKeyNode(text, rawText);
  }

  /**
   * Defines the JSON Serialization strategy for an {@link EmbeddedKeyNode}.
   */
  exportJSON(): SerializedEmbeddedKeyNode {
    return {
      text: this.__text,
      rawText: this.__rawText,
      format: this.getFormat(),
      style: this.getStyle(),
      mode: this.getMode(),
      detail: this.getDetail(),
      type: "embedkey",
      version: 1,
    };
  }
}

export function $createEmbeddedKeyNode(text: string, rawText: string): EmbeddedKeyNode {
  return new EmbeddedKeyNode(text, rawText).setMode('token');
}
