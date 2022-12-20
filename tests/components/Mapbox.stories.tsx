import { ComponentMeta, Story } from "@storybook/react";
import { Coordinate } from "@yext/types";
import { MapboxMap, MapboxMapProps } from "../../src/components/MapboxMap";

const meta: ComponentMeta<typeof MapboxMap> = {
  title: "MapboxMap",
  component: MapboxMap,
  argTypes: {
    mapboxAccessToken: {
      defaultValue: process.env.REACT_APP_MAPBOX_API_KEY,
      control: false,
    },
    PinComponent: {
      control: false,
    },
    markerLocations: {
      control: false,
    },
  },
  parameters: { layout: "fullscreen", percy: { enableJavascript: true } },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Primary: Story<MapboxMapProps> = (args) => {
  const markerLocations: Coordinate[] = [
    {
      latitude: 40.71,
      longitude: -74.005371,
    },
    {
      latitude: 40.741611,
      longitude: -73.98,
    },
  ];
  return <MapboxMap {...args} markerLocations={markerLocations} />;
};
