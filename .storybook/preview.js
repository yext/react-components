import { runOnly } from "./wcagConfig";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";

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
