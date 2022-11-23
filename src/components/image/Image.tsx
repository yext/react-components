import { useEffect, useMemo, useRef, useState } from "react";
import { ImageProps } from "./types";
import { getImgHTMLAttributes } from "./utils";

/**
 * Renders an image based from the Yext Knowledge Graph. Example of using the component to render
 * simple and complex image fields from Yext Knowledge Graph:
 * ```
 * import { Image } from "@yext/react-components";
 *
 * const simpleImage = (<Image image={document.logo} />);
 * const complexImage = (<Image image={document.photoGallery[0]} />);
 * ```
 *
 * @public
 */
export function Image({
  placeholder,
  imgOverrides,
  ...imgHtmlAttributesConfig
}: ImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsImageLoaded(true);
    }
  }, []);

  const imgHtmlAttributes = useMemo(() => {
    return getImgHTMLAttributes(imgHtmlAttributesConfig);
  }, [imgHtmlAttributesConfig]);

  // The image is invalid, only try to load the placeholder
  if (!imgHtmlAttributes) {
    return <>{placeholder != null && placeholder}</>;
  }

  return (
    <>
      {!isImageLoaded && placeholder != null && placeholder}
      <img ref={imgRef} alt="" {...imgHtmlAttributes} {...imgOverrides} />
    </>
  );
}
