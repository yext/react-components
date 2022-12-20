import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { runOnly } from "./wcagConfig";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  a11y: {
    options: {
      runOnly,
    },
  },
  options: {
    storySort: {
      order: ["Image", "Address"],
    },
  },
};
