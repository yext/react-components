import { Image } from "../../src/components/image/Image";
import {
  ComplexImageType,
  ImageLayout,
  ImageType,
} from "../../src/components/image/types";
import { render, screen } from "@testing-library/react";
import {
  getImageUUID,
  getImageEnv,
  getImageSizeForFixedLayout,
  getImgHTMLAttributes,
} from "../../src/components/image/utils";

const simpleImage: ImageType = {
  alternateText: "simple alt text",
  width: 20,
  height: 10,
  url: `https://a.mktgcdn.com/p/simple-image-uuid/2x1.jpg`,
};
const complexImage: ComplexImageType = {
  image: {
    alternateText: "complex alt text",
    width: 20,
    height: 10,
    url: `https://a.mktgcdn.com/p/complex-image-uuid/2x1.jpg`,
  },
};

describe("Image", () => {
  it("renders simple image field", () => {
    render(<Image image={simpleImage} />);
    expect(screen.getByRole("img")).toHaveProperty(
      "alt",
      simpleImage.alternateText
    );
    expect(screen.getByRole("img")).toHaveProperty(
      "src",
      expect.stringContaining("https://dynl.mktgcdn.com/p/simple-image-uuid/")
    );
  });

  it("renders complex image field", () => {
    render(<Image image={complexImage} />);
    expect(screen.getByRole("img")).toHaveProperty(
      "alt",
      complexImage.image.alternateText
    );
    expect(screen.getByRole("img")).toHaveProperty(
      "src",
      expect.stringContaining("https://dynl.mktgcdn.com/p/complex-image-uuid/")
    );
  });

  it("renders the placeholder before the image is loaded", () => {
    const placeholderText = "Placeholder";
    const placeholder = <div>{placeholderText}</div>;
    render(<Image image={simpleImage} placeholder={placeholder} />);
    expect(screen.getByText(placeholderText)).toBeTruthy();
    expect(screen.getByRole<HTMLImageElement>("img").complete).toEqual(false);
  });

  it("renders the placeholder if image's UUID is invalid and a placeholder is provided", () => {
    const placeholderText = "Placeholder";
    const placeholder = <div>{placeholderText}</div>;
    const logMock = jest.spyOn(console, "error").mockImplementation();
    const invalidUrl = "https://a.mktgcdn.com/p/2x1.jpg";

    expect(logMock).not.toBeCalled();
    render(
      <Image
        image={{
          ...simpleImage,
          url: invalidUrl,
        }}
        placeholder={placeholder}
      />
    );
    expect(screen.getByText(placeholderText)).toBeTruthy();
    expect(screen.queryByRole("img")).toBeNull();
    expect(logMock).toBeCalledTimes(1);
    expect(logMock).toBeCalledWith(`Invalid image url: ${invalidUrl}.`);
  });

  it("renders nothing if image's UUID is invalid and a placeholder is not provided", () => {
    const logMock = jest.spyOn(console, "error").mockImplementation();
    const invalidUrl = "https://a.mktgcdn.com/p/4x4.jpg";

    expect(logMock).not.toBeCalled();
    const { container } = render(
      <Image
        image={{
          ...simpleImage,
          url: invalidUrl,
        }}
      />
    );
    expect(container.innerHTML).toHaveLength(0);
    expect(logMock).toBeCalledTimes(1);
    expect(logMock).toBeCalledWith(`Invalid image url: ${invalidUrl}.`);
  });

  it("renders the srcset based on the correct prod env", () => {
    render(<Image image={simpleImage} />);
    expect(screen.getByRole("img").getAttribute("srcset")).toContain(
      "dynl.mktgcdn.com/p/"
    );
  });

  it("renders the srcset based on the correct sandbox env", () => {
    render(
      <Image
        image={{
          ...simpleImage,
          url: "https://a.mktgcdn.com/p-sandbox/${imgUUID}/2x1.jpg",
        }}
      />
    );
    expect(screen.getByRole("img").getAttribute("srcset")).toContain(
      "dynl.mktgcdn.com/p-sandbox/"
    );
  });

  it("renders the image with 'loading' set to 'lazy' by default", () => {
    render(<Image image={simpleImage} />);
    expect(screen.getByRole("img").getAttribute("loading")).toEqual("lazy");
  });

  it("renders the image with 'loading' set to 'eager'", () => {
    render(<Image image={simpleImage} loading="eager" />);
    expect(screen.getByRole("img").getAttribute("loading")).toEqual("eager");
  });

  it("renders the image with the pass through style, classname and imgOverrides", () => {
    const overrideSrc = "https://overridesrc/";
    const overrideObjectFit = "none";
    render(
      <Image
        image={simpleImage}
        style={{ objectFit: overrideObjectFit }}
        imgOverrides={{ src: overrideSrc }}
        className="test-classname"
      />
    );
    screen.getByRole("img").className;
    expect(screen.getByRole("img").style.objectFit).toEqual(overrideObjectFit);
    expect(screen.getByRole("img")).toHaveProperty("src", overrideSrc);
    expect(screen.getByRole("img").className).toEqual("test-classname");
  });
});

describe("getImageUUID", () => {
  const uuid = "EttBe_p52CsFx6ZlAn0-WpvY9h_MCYPH793iInfWY54";
  it("extracts the image UUID from proper image url", () => {
    expect(getImageUUID(`http://a.mktgcdn.com/p/${uuid}/443x443.jpg`)).toBe(
      uuid
    );
    expect(getImageUUID(`https://a.mktgcdn.com/p/${uuid}/`)).toBe(uuid);
    expect(
      getImageUUID(`http://a.mktgcdn.com/p-sandbox/${uuid}/443x443.jpg`)
    ).toBe(uuid);
    expect(getImageUUID(`http://a.mktgcdn.com/p-qa/${uuid}/443x443.jpg`)).toBe(
      uuid
    );
    expect(getImageUUID(`http://a.mktgcdn.com/p-dev/${uuid}/443x443.jpg`)).toBe(
      uuid
    );
  });

  it("returns empty string with a console error for improper image url", () => {
    const logMock = jest.spyOn(console, "error").mockImplementation();
    [
      `https://a.mktgcdn.com/p/${uuid}`,
      "https://a.mktgcdn.com/p//1300x872.jpg",
      "https://a.mktgcdn.com/p/1300x872.jpg",
      `http://a.mktgcdn.com/p-badinput/${uuid}/443x443.jpg`,
      "",
    ].forEach((url) => {
      expect(getImageUUID(url)).toBe("");
      expect(logMock).toBeCalledWith(`Invalid image url: ${url}.`);
    });
  });
});

describe("getImageEnv", () => {
  it("properly extracts the image env", () => {
    expect(getImageEnv("http://a.mktgcdn.com/p/some-uuid/443x443.jpg")).toBe(
      undefined
    );
    expect(getImageEnv("https://a.mktgcdn.com/p-sandbox/some-uuid/")).toBe(
      "-sandbox"
    );
    expect(getImageEnv("http://a.mktgcdn.com/p-qa/some-uuid/443x443.jpg")).toBe(
      "-qa"
    );
    expect(
      getImageEnv("http://a.mktgcdn.com/p-dev/some-uuid/443x443.jpg")
    ).toBe("-dev");
  });
});

describe("getImageSizeForFixedLayout", () => {
  const imgWidth = 2;
  const imgHeight = 3;
  const width = 4;
  const height = 5;

  it("returns fixed dimensions using image data's dimension and default fixed widths", () => {
    expect(
      getImageSizeForFixedLayout(imgWidth, imgHeight, undefined, undefined)
    ).toEqual({
      fixedWidth: imgWidth,
      fixedHeight: imgHeight,
      fixedWidths: [100, 320, 640, 960, 1280, 1920],
    });
  });

  it("returns fixed dimensions using user's configured height and width", () => {
    expect(
      getImageSizeForFixedLayout(imgWidth, imgHeight, width, height)
    ).toEqual({ fixedWidth: width, fixedHeight: height, fixedWidths: [width] });
  });

  it("returns fixed dimensions using image data's dimension and user's configured width only", () => {
    expect(
      getImageSizeForFixedLayout(imgWidth, imgHeight, width, undefined)
    ).toEqual({
      fixedWidth: width,
      fixedHeight: (width * imgHeight) / imgWidth,
      fixedWidths: [width],
    });
  });

  it("returns fixed dimensions using image data's dimension and user's configured height only", () => {
    expect(
      getImageSizeForFixedLayout(imgWidth, imgHeight, undefined, height)
    ).toEqual({
      fixedWidth: (height / imgHeight) * imgWidth,
      fixedHeight: height,
      fixedWidths: [(height / imgHeight) * imgWidth],
    });
  });
});

describe("getImgHTMLAttributes", () => {
  const DEFAULT_SIMPLE_IMAGE_SRCSET =
    "https://dynl.mktgcdn.com/p/simple-image-uuid/100x50 100w, " +
    "https://dynl.mktgcdn.com/p/simple-image-uuid/320x160 320w, " +
    "https://dynl.mktgcdn.com/p/simple-image-uuid/640x320 640w, " +
    "https://dynl.mktgcdn.com/p/simple-image-uuid/960x480 960w, " +
    "https://dynl.mktgcdn.com/p/simple-image-uuid/1280x640 1280w, " +
    "https://dynl.mktgcdn.com/p/simple-image-uuid/1920x960 1920w";

  const DEFAULT_SIMPLE_IMAGE_SIZES =
    "(max-width: 640px) 100px, (max-width: 768px) 320px, " +
    "(max-width: 1024px) 640px, (max-width: 1280px) 960px, (max-width: 1536px) 1280px, 1920px";

  it(`properly constructs img attributes with ${ImageLayout.INTRINSIC} layout`, () => {
    const imgHtmlAttributes = getImgHTMLAttributes({
      image: simpleImage,
      layout: ImageLayout.INTRINSIC,
    });
    const expectedImgHtmlAttributes: React.ImgHTMLAttributes<HTMLImageElement> =
      {
        alt: simpleImage.alternateText,
        loading: "lazy",
        style: {
          objectFit: "cover",
          objectPosition: "center",
          maxWidth: simpleImage.width,
          width: "100%",
          aspectRatio: `${simpleImage.width} / ${simpleImage.height}`,
        },
        src: "https://dynl.mktgcdn.com/p/simple-image-uuid/500x500",
        sizes: DEFAULT_SIMPLE_IMAGE_SIZES,
        srcSet: DEFAULT_SIMPLE_IMAGE_SRCSET,
      };
    expect(imgHtmlAttributes).toEqual(expectedImgHtmlAttributes);
  });

  it(`properly constructs img attributes with ${ImageLayout.FILL} layout`, () => {
    const imgHtmlAttributes = getImgHTMLAttributes({
      image: simpleImage,
      layout: ImageLayout.FILL,
    });
    const expectedImgHtmlAttributes: React.ImgHTMLAttributes<HTMLImageElement> =
      {
        alt: simpleImage.alternateText,
        loading: "lazy",
        style: {
          objectFit: "cover",
          objectPosition: "center",
          width: "100%",
          aspectRatio: `${simpleImage.width} / ${simpleImage.height}`,
        },
        src: "https://dynl.mktgcdn.com/p/simple-image-uuid/500x500",
        sizes: DEFAULT_SIMPLE_IMAGE_SIZES,
        srcSet: DEFAULT_SIMPLE_IMAGE_SRCSET,
      };
    expect(imgHtmlAttributes).toEqual(expectedImgHtmlAttributes);
  });

  it(`properly constructs img attributes with ${ImageLayout.ASPECT} layout`, () => {
    const imgHtmlAttributes = getImgHTMLAttributes({
      image: simpleImage,
      layout: ImageLayout.ASPECT,
      aspectRatio: 1,
    });
    const expectedImgHtmlAttributes: React.ImgHTMLAttributes<HTMLImageElement> =
      {
        alt: simpleImage.alternateText,
        loading: "lazy",
        style: {
          objectFit: "cover",
          objectPosition: "center",
          aspectRatio: "1",
        },
        src: "https://dynl.mktgcdn.com/p/simple-image-uuid/500x500",
        sizes: DEFAULT_SIMPLE_IMAGE_SIZES,
        srcSet: DEFAULT_SIMPLE_IMAGE_SRCSET,
      };
    expect(imgHtmlAttributes).toEqual(expectedImgHtmlAttributes);
  });

  it(`properly constructs img attributes with ${ImageLayout.FIXED} layout`, () => {
    const imgHtmlAttributes = getImgHTMLAttributes({
      image: simpleImage,
      layout: ImageLayout.FIXED,
      width: 20,
      height: 30,
    });
    const expectedImgHtmlAttributes: React.ImgHTMLAttributes<HTMLImageElement> =
      {
        alt: simpleImage.alternateText,
        loading: "lazy",
        style: {
          width: 20,
          height: 30,
          objectFit: "cover",
          objectPosition: "center",
        },
        width: 20,
        height: 30,
        src: "https://dynl.mktgcdn.com/p/simple-image-uuid/20x30",
        sizes: "20px",
        srcSet: "https://dynl.mktgcdn.com/p/simple-image-uuid/20x10 20w",
      };
    expect(imgHtmlAttributes).toEqual(expectedImgHtmlAttributes);
  });
});
