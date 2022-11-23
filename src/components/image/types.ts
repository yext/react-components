import { DistributiveOmit, EnumOrLiteral } from "../utils";

/**
 * The type definition for a thumbnail.
 *
 * @public
 */
export type ThumbnailType = {
  height: number;
  width: number;
  url: string;
};

/**
 * The type definition for a complex image.
 *
 * @public
 */
export type ComplexImageType = {
  image: {
    alternateText?: string;
    height: number;
    width: number;
    url: string;
    thumbnails?: ThumbnailType[];
  };
};

/**
 * The type definition for an image.
 *
 * @public
 */
export type ImageType = {
  alternateText?: string;
  height: number;
  width: number;
  url: string;
};

/**
 * Layout option on the {@link Image} component.
 *
 * @public
 */
export enum ImageLayout {
  /**
   * The the default layout if one is not specified. An image will be scaled down to fit the
   * container but not exceed the absolute size of the image.
   */
  INTRINSIC = "intrinsic",
  /**
   * Shows the image in a fixed size. `width` or `height` must be passed in. If both `width` and
   * `height` are passed in, but the aspect ratio does not match the aspect ratio of the image,
   * the image will be centered. This behavior can be adjusted using the `objectFit` and
   * `objectPosition` props of the `style` rpop.
   */
  FIXED = "fixed",
  /** Shows the image in a fixed aspect ratio. The `aspectRatio` prop must be provided. */
  ASPECT = "aspect",
  /** Always fills the image to 100% of the container's width. */
  FILL = "fill",
}

/**
 * Image load state option on the {@link Image} component.
 *
 * @public
 */
export enum ImageLoadState {
  /** TODO */
  EAGER = "eager",
  /** TODO */
  LAZY = "lazy",
}

/**
 * The shape of the data passed to {@link Image}.
 */
interface BaseImageProps {
  /** The image field from Knowledge Graph. */
  image: ComplexImageType | ImageType;
  /** Overrides the className on the underlying img tag. */
  className?: string;
  /** A pass through react component that is displayed when the image is loading. */
  placeholder?: React.ReactNode;
  /** Pass through props that are on the native HTML img tag. The Image component may not work if src and/or srcsets are included. */
  imgOverrides?: React.ImgHTMLAttributes<HTMLImageElement>;
  /** The pass through style of the underlying img tag. */
  style?: React.CSSProperties;
  /** Set the loading state of the image. */
  loading?: EnumOrLiteral<ImageLoadState>;
}

/**
 * The shape of the data passed to {@link Image} when layout is {@link ImageLayout.INTRINSIC},
 * {@link ImageLayout.FILL} or not provided.
 */
type OtherImageProps = BaseImageProps & {
  /** Specifies how the image is rendered. */
  layout?: EnumOrLiteral<ImageLayout.INTRINSIC | ImageLayout.FILL>;
};

/**
 * The shape of the data passed to {@link Image} when layout is {@link ImageLayout.FIXED}.
 * Extends the {@link BaseImageProps} interface and has the additions of a width and height,
 * at least one of which must be specified.
 */
type FixedImageProps = BaseImageProps & {
  /** Specifies how the image is rendered. */
  layout: EnumOrLiteral<ImageLayout.FIXED>;
  /** The absolute height of the image. */
  height?: number;
  /** The absolute width of the image. */
  width?: number;
} & ({ height: number } | { width: number });

/**
 * The shape of the data passed to {@link Image} when layout is {@link ImageLayout.ASPECT}.
 * Extends the {@link BaseImageProps} interface and has the additions of a required aspectRatio.
 */
type AspectImageProps = BaseImageProps & {
  /** Specifies how the image is rendered. */
  layout: EnumOrLiteral<ImageLayout.ASPECT>;
  /** The aspect ratio of the image. */
  aspectRatio: number;
};

/**
 * The shape of the data passed to {@link Image}.
 *
 * @public
 */
export type ImageProps = FixedImageProps | AspectImageProps | OtherImageProps;

/**
 * The "img" HTML element attributes configuration in the union type {@link ImageProps}.
 */
export type ImgHtmlAttributesConfig = DistributiveOmit<
  ImageProps,
  "placeholder" | "imgOverrides"
>;

/**
 * The layout specific attributes configuration in the union type {@link ImageProps}.
 */
export type LayoutAttributesConfig = DistributiveOmit<
  ImageProps,
  keyof BaseImageProps
>;
