import "./index.css";
import "mapbox-gl/dist/mapbox-gl";
import { runOnly } from "./wcagConfig";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
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
