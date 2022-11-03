import React from 'react';
import Yext from '@yext/types';
import { AddressPart } from './types';
import { AddressLine } from './AddressLine';
import { localeAddressFormat } from './i18n';

export interface AddressProps extends React.HTMLProps<HTMLDivElement> {
  address: Yext.Address,
  lines?: AddressPart[],
  separator?: string
}

/**
 * Renders an HTML address based from the Yext Knowledge Graph. Example of using the component to render
 * a location entity's address from Yext Knowledge Graph:
 * ```
 * import { Address } from "@yext/react-components";
 *
 * const address = (<Address address={document.address} />);
 *   --> 1101 Wilson Blvd., Suite 2300,
 *       Arlington, VA, 22201,
 *       US
 * const customAddress = (<Address address={document.address} lines={[['line1', 'city', 'region']]} />);
 *   --> 1101 Wilson Blvd., Arlington, VA
 * ```
 *
 * @public
 */
export const Address = ({
  address,
  lines = localeAddressFormat(address.countryCode),
  separator = ',',
  ...props
}: AddressProps) => {
  const renderedLines = lines.map(
    (line) => (
      <AddressLine
        address={address}
        line={line}
        separator={separator}
        key={line.toString()}
      />
    )
  );

  return <div {...props}>{renderedLines}</div>;
};
