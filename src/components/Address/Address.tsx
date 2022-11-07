import { Address } from '@yext/types';
import { AddressFieldName } from './types';
import { AddressLine } from './AddressLine';
import { localeAddressFormat } from './i18n';

/**
 * The shape of the data passed to {@link Address}
 */
export interface AddressProps extends React.HTMLProps<HTMLDivElement> {
  /** The address field from Knowledge Graph. */
  address: Address,
  /** Sets a custom format to display the address. */
  lines?: AddressFieldName[][],
  /** Sets a custom separator. Defaults to a comma. */
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
export function Address({
  address,
  lines = localeAddressFormat(address.countryCode),
  separator = ',',
  ...htmlProps
}: AddressProps) {
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

  return <div {...htmlProps}>{renderedLines}</div>;
}
