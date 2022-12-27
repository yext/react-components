# react-components

<div>
  <a href="https://npmjs.org/package/@yext/react-components">
    <img src="https://img.shields.io/npm/v/@yext/react-components" alt="NPM version"/>
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-BSD%203--Clause-blue.svg" alt="License"/>
  </a>
  <a href='https://coveralls.io/github/yext/react-components?branch=main'>
    <img src='https://coveralls.io/repos/github/yext/react-components/badge.svg?branch=main' alt='Coverage Status' />
  </a>
</div>
<br>

A library of React Components for rendering complex Yext data types. See [@yext/types](https://github.com/yext/types) for type declarations.

## Directory

| Component  | Demo       |
| ---------- | ---------- |
| Image      | [Storybook](https://leniently-relative-caiman.pgsdemo.com/?path=/story/image--primary) |
| Address    | [Storybook](https://leniently-relative-caiman.pgsdemo.com/?path=/story/address--primary) |
| Hours      | [Storybook](https://leniently-relative-caiman.pgsdemo.com/?path=/story/hours--primary) |
| HoursTable | [Storybook](https://leniently-relative-caiman.pgsdemo.com/?path=/story/hourstable--primary) |
| Map        | [Storybook](https://leniently-relative-caiman.pgsdemo.com/?path=/story/mapboxmap--primary) |

## Getting Started

```bash
npm install @yext/react-components
```

Once the library is installed, our React Components should be available throughout your application.

```tsx
import {
  Address as AddressType,
  Hours as HoursType,
  Image as ImageType,
  Coordinate,
} from "@yext/types";
import { Address, Hours, Image, Map } from "@yext/react-components";

interface LocationProps = {
  address: AddressType;
  hours: HoursType;
  c_storefront: ImageType;
  locationCoordinate: Coordinate;
}

const Location = (props: LocationProps) => {
  return (
    <>
      <Address address={props.address} />
      <Hours hours={props.hours} />
      <Image image={props.c_storefront} />
      <Map markerLocations={[props.locationCoordinate]} />
    </>
  );
}

export default Location;
```
