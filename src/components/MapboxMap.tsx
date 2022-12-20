import { useRef, useEffect } from "react";
import mapboxgl, {
  Map,
  Marker,
  MapboxOptions,
  LngLatBounds,
  MarkerOptions,
  LngLat,
} from "mapbox-gl";
import { useDebouncedFunction } from "../hooks/useDebouncedFunction";
import ReactDOM from "react-dom";
import { Coordinate } from "@yext/types";

/**
 * A functional component that can be used to render a custom marker on the map.
 *
 * @public
 */
export type PinComponent = (props: {
  index: number;
  mapbox: Map;
  coordinate: Coordinate;
}) => JSX.Element;

/**
 * A function which is called when the user drags the map.
 *
 * @public
 */
export type OnDragHandler = (center: LngLat, bounds: LngLatBounds) => void;

/**
 * Props for the {@link MapboxMap} component.
 *
 * @public
 */
export interface MapboxMapProps {
  /** Mapbox access token. */
  mapboxAccessToken: string;
  /** The list of coordinates for the markers to be displayed. */
  markerLocations: Coordinate[];
  /** Interface for map customization derived from Mapbox GL's Map options. */
  mapboxOptions?: Omit<MapboxOptions, "container">;
  /**
   * Custom Pin component to render markers on the map. By default, the built-in marker
   * image from Mapbox GL is used.
   */
  PinComponent?: PinComponent;
  /** {@inheritDoc OnDragHandler} */
  onDrag?: OnDragHandler;
}

/**
 * A component that renders a Mapbox GL Map with the provided markers.
 *
 * @remarks
 * For the map to work properly, be sure to include Mapbox GL stylesheet in the application.
 *
 * @example
 * For instance, user may add the following import statement in their application's index file
 * or in the file where `MapboxMap` is used:
 * `import 'mapbox-gl/dist/mapbox-gl.css';`
 *
 * Or, user may add a stylesheet link in their html page:
 * `<link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet" />`
 *
 * @param props - {@link MapboxMapProps}
 * @returns A React element containing a Mapbox Map
 *
 * @public
 */
export function MapboxMap({
  mapboxAccessToken,
  mapboxOptions,
  PinComponent,
  markerLocations,
  onDrag,
}: MapboxMapProps) {
  useEffect(() => {
    mapboxgl.accessToken = mapboxAccessToken;
  }, [mapboxAccessToken]);

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const markers = useRef<Marker[]>([]);

  const onDragDebounced = useDebouncedFunction(onDrag, 100);

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      const options: MapboxOptions = {
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11?optimize=true",
        center: [-74.005371, 40.741611],
        zoom: 9,
        ...mapboxOptions,
      };
      map.current = new Map(options);
      const mapbox = map.current;
      mapbox.resize();
      if (onDragDebounced) {
        mapbox.on("drag", () => {
          onDragDebounced(mapbox.getCenter(), mapbox.getBounds());
        });
      }
    }
  }, [mapboxOptions, onDragDebounced]);

  useEffect(() => {
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];
    const mapbox = map.current;
    if (mapbox && markerLocations.length > 0) {
      generateMarkers(markerLocations, mapbox, markers, PinComponent);
    }
  }, [PinComponent, markerLocations]);

  return <div className="w-full" ref={mapContainer} />;
}

/**
 * Renders a new set of Markers using the provided coordinates and adds them to the Map.
 * Additionally, updates the provided array of Marker React Refs.
 */
function generateMarkers(
  markerLocations: Coordinate[],
  mapbox: mapboxgl.Map,
  markerRefs: React.MutableRefObject<mapboxgl.Marker[]>,
  PinComponent: PinComponent | undefined
) {
  const bounds = new LngLatBounds();
  markerLocations.forEach((markerLocation, i) => {
    const { latitude, longitude } = markerLocation;
    const el = document.createElement("div");
    const markerOptions: MarkerOptions = {};
    if (PinComponent) {
      ReactDOM.render(
        <PinComponent index={i} mapbox={mapbox} coordinate={markerLocation} />,
        el
      );
      markerOptions.element = el;
    }
    const marker = new Marker(markerOptions)
      .setLngLat({ lat: latitude, lng: longitude })
      .addTo(mapbox);
    markerRefs.current.push(marker);
    bounds.extend([longitude, latitude]);
  });

  if (!bounds.isEmpty()) {
    mapbox.fitBounds(bounds, {
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
      maxZoom: 15,
    });
  }
}
