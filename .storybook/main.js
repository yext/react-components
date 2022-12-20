const { mergeConfig } = require("vite");

module.exports = {
  stories: ["../tests/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-coverage",
      options: {
        istanbul: {
          include: ["src/components/**"],
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  viteFinal(config) {
    return mergeConfig(config, {
      css: {
        postcss: __dirname,
      },
    });
  },
  staticDirs: ["./public"],
  env: (config) => ({
    ...config,
    REACT_APP_MAPBOX_API_KEY: process.env.MAPBOX_API_KEY || process.env.REACT_APP_MAPBOX_API_KEY,
  }),
};
