import { render } from "@testing-library/react";
import { Coordinate } from "@yext/types";
import { Map, Marker } from "mapbox-gl";

import { MapboxMap } from "../../src/components";

jest.mock("mapbox-gl");

it('registers "onDrag" callback to Mapbox\'s event listener for "drag to pan" interaction', () => {
  jest.useFakeTimers();
  jest.spyOn(Marker.prototype, "setLngLat").mockReturnValue(Marker.prototype);
  const mapOnEventListener = jest
    .spyOn(Map.prototype, "on")
    .mockImplementation((e, cb) => {
      e === "drag" && cb({});
      return Map.prototype;
    });
  const onDragFn = jest.fn();

  const markerLocations: Coordinate[] = [
    {
      latitude: 0.0,
      longitude: 0.0,
    },
  ];

  render(
    <MapboxMap
      mapboxAccessToken="TEST_KEY"
      markerLocations={markerLocations}
      onDrag={onDragFn}
    />
  );
  expect(mapOnEventListener).toBeCalledWith("drag", expect.anything());
  expect(onDragFn).toBeCalledTimes(0);
  jest.advanceTimersByTime(100); //debounce time
  expect(onDragFn).toBeCalledTimes(1);
});
