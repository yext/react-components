import { Address as AddressType } from "@yext/types"
import { AddressLine } from "./AddressLine"
import { localeAddressFormat } from "./i18n"

/**
 * The shape of the data passed to {@link Address}.
 *
 * @public
 */
export interface AddressProps {
  /** The address field from Knowledge Graph. */
  address: AddressType
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
 * ```
 *
 * @public
 */
export function Address({ address }: AddressProps) {
  const renderedLines = localeAddressFormat(address.countryCode).map(line => (
    <AddressLine address={address} line={line} key={line.toString()} />
  ))

  return <div>{renderedLines}</div>
}
