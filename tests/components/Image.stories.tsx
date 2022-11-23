import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Image } from "../../src/components/image/Image";
import { ComplexImageType } from "../../src/components/image/types";

const image: ComplexImageType = {
  image: {
    url: "https://a.mktgcdn.com/p/xMc2BbiWF73cnpOmEs8XNtkl2lljOlwrbeI4G3T6vn4/450x450.jpg",
    width: 450,
    height: 450,
    thumbnails: [
      {
        url: "https://a.mktgcdn.com/p/xMc2BbiWF73cnpOmEs8XNtkl2lljOlwrbeI4G3T6vn4/450x450.jpg",
        width: 450,
        height: 450,
      },
    ],
  },
};

const meta: ComponentMeta<typeof Image> = {
  title: "Image",
  component: Image,
};
export default meta;

export const Primary: ComponentStory<typeof Image> = (args) => (
  <Image {...args} />
);
Primary.args = {
  image: image,
};
