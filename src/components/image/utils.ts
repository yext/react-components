import React, { ImgHTMLAttributes } from "react";
import {
  ImageLayout,
  ImageLoadState,
  ImgHtmlAttributesConfig,
  LayoutAttributesConfig,
} from "./types";

const MKTGCDN_URL_REGEX =
  /(https?:\/\/a.mktgcdn.com\/p(?<env>-sandbox|-qa|-dev)?\/)(?<uuid>.+)\/(.*)/;
const DEFAULT_IMAGE_FIXED_WIDTHS = [100, 320, 640, 960, 1280, 1920];

/**
 * Returns the UUID of an image given its url. Logs an error if the image url is invalid.
 */
export function getImageUUID(url: string): string {
  const matches = url.match(MKTGCDN_URL_REGEX);
  if (!matches?.groups?.uuid) {
    console.error(`Invalid image url: ${url}.`);
    return "";
  }
  return matches.groups.uuid;
}

/**
 * Returns the environment suffix for a url's bucket, if present.
 */
export function getImageEnv(url: string): string | undefined {
  const matches = url.match(MKTGCDN_URL_REGEX);
  return matches?.groups?.env;
}

/**
 * Returns the image url given its uuid, width and height.
 */
function getImageUrl(
  uuid: string,
  width: number,
  height: number,
  imgUrl: string
): string {
  const env = getImageEnv(imgUrl);
  const bucket = env ? `p${env}` : "p";
  const dimension = `${Math.round(width)}x${Math.round(height)}`;
  return `https://dynl.mktgcdn.com/${bucket}/${uuid}/${dimension}`;
}

/**
 * Returns image source set.
 */
function getImageSrcSet(
  widths: number[],
  imgUUID: string,
  imgWidth: number,
  imgHeight: number,
  imgUrl: string
): string {
  return widths
    .map(
      (w) =>
        `${getImageUrl(imgUUID, w, (imgHeight / imgWidth) * w, imgUrl)} ${w}w`
    )
    .join(", ");
}

/**
 * Returns image sizes.
 */
function getImageSizes(widths: number[]): string {
  const maxWidthBreakpoints = [640, 768, 1024, 1280, 1536];
  return widths
    .map((w, i) =>
      i === widths.length - 1
        ? `${w}px`
        : `(max-width: ${maxWidthBreakpoints[i]}px) ${w}px`
    )
    .join(", ");
}

/**
 * Returns the fixedWidth and fixedHeight for fixed layout.
 */
export function getImageSizeForFixedLayout(
  imgWidth: number,
  imgHeight: number,
  configuredWidth?: number,
  configuredHeight?: number
): { fixedWidth: number; fixedHeight: number; fixedWidths: number[] } {
  if (configuredWidth && configuredHeight) {
    return {
      fixedWidth: configuredWidth,
      fixedHeight: configuredHeight,
      fixedWidths: [configuredWidth],
    };
  }
  if (configuredWidth) {
    return {
      fixedWidth: configuredWidth,
      fixedHeight: (configuredWidth * imgHeight) / imgWidth,
      fixedWidths: [configuredWidth],
    };
  }
  if (configuredHeight) {
    return {
      fixedWidth: (configuredHeight / imgHeight) * imgWidth,
      fixedHeight: configuredHeight,
      fixedWidths: [(configuredHeight / imgHeight) * imgWidth],
    };
  }
  return {
    fixedWidth: imgWidth,
    fixedHeight: imgHeight,
    fixedWidths: DEFAULT_IMAGE_FIXED_WIDTHS,
  };
}

/**
 * Returns image attributes that will be set on the underlying img tag based on image layout.
 */
function getLayoutAttributes(
  args: {
    imgWidth: number;
    imgHeight: number;
    imgUrl: string;
    imgUUID: string;
  } & LayoutAttributesConfig
): ImgHTMLAttributes<HTMLImageElement> {
  const { layout, imgWidth, imgHeight, imgUrl, imgUUID } = args;
  let widths: number[] = DEFAULT_IMAGE_FIXED_WIDTHS;
  const style: React.CSSProperties = {};
  const attributes: ImgHTMLAttributes<HTMLImageElement> = {};
  switch (layout) {
    case undefined:
    // If layout is not defined, default to ImageLayout.INTRINSIC (fall through)
    case ImageLayout.INTRINSIC:
      // Don't let image be wider than its intrinsic width
      style.maxWidth = imgWidth;
      style.width = "100%";
      style.aspectRatio = `${imgWidth} / ${imgHeight}`;
      break;
    case ImageLayout.FIXED:
      const { fixedWidth, fixedHeight, fixedWidths } =
        getImageSizeForFixedLayout(
          imgWidth,
          imgHeight,
          args.width,
          args.height
        );
      widths = fixedWidths;
      style.width = fixedWidth;
      style.height = fixedHeight;
      attributes.width = args.width;
      attributes.height = args.height;
      attributes.src = getImageUrl(imgUUID, fixedWidth, fixedHeight, imgUrl);
      break;
    case ImageLayout.ASPECT:
      style.aspectRatio = `${args.aspectRatio}`;
      break;
    case ImageLayout.FILL:
      style.width = "100%";
      style.aspectRatio = `${imgWidth} / ${imgHeight}`;
      break;
    default:
      console.warn(`Unrecognized layout: ${layout}.`);
      break;
  }
  attributes.src = attributes.src ?? getImageUrl(imgUUID, 500, 500, imgUrl);
  attributes.srcSet = getImageSrcSet(
    widths,
    imgUUID,
    imgWidth,
    imgHeight,
    imgUrl
  );
  attributes.sizes = getImageSizes(widths);
  attributes.style = style;
  return attributes;
}

/**
 * Returns image attributes that will be set on the underlying img tag based
 * on layout and other properties configured through component's props.
 */
export function getImgHTMLAttributes(
  args: ImgHtmlAttributesConfig
): ImgHTMLAttributes<HTMLImageElement> | null {
  const {
    className,
    style: styleConfig,
    image,
    loading = ImageLoadState.LAZY,
    ...layoutAttributesConfig
  } = args;
  const {
    width: imgWidth,
    height: imgHeight,
    url: imgUrl,
    alternateText: alt,
  } = "image" in image ? image.image : image;
  const imgUUID = getImageUUID(imgUrl);
  if (!imgUUID) {
    return null;
  }
  const defaultImageStyle: React.CSSProperties = {
    objectFit: "cover",
    objectPosition: "center",
  };
  const { style: layoutStyle, ...otherLayoutAttributes } = getLayoutAttributes({
    imgWidth,
    imgHeight,
    imgUrl,
    imgUUID,
    ...layoutAttributesConfig,
  });
  const attributes: ImgHTMLAttributes<HTMLImageElement> = {
    loading,
    alt,
    className,
    style: {
      ...defaultImageStyle,
      ...styleConfig,
      ...layoutStyle,
    },
    ...otherLayoutAttributes,
  };
  return attributes;
}
