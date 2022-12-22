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

A library of React Components for rendering complex Yext data types.

## Getting Started

```bash
npm install @yext/react-components
```

Once the library is installed, our React Components should be available throughout your application.

```tsx
import { Address, Hours, Image, Map } from "@yext/react-components";

...

const Location: Template<TemplateRenderProps> = ({ document }) => {
  return (
    <>
      <Address address={document.address} />
      <Hours hours={document.hours} />
      <Image image={document.c_myImage} />
      <Map markerLocations={[document.locationCoordinate]} />
    </>
  );
}

export default Location;
```
