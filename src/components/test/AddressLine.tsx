import { ReactElement } from "react";
import { Address } from "@yext/types";
import { AddressFieldName } from "./types";
import { getUnabbreviated } from "./methods";

/**
 * The shape of the data passed to {@link AddressLine}.
 */
export interface AddressLineProps {
  /** The address field from Knowledge Graph. */
  address: Address;
  /** The format to display for the particular address line. */
  line: AddressFieldName[];
}

export function AddressLine({ address, line }: AddressLineProps) {
  const addressLineEls: ReactElement[] = line
    .filter((fieldName) => fieldName === "," || address[fieldName])
    .map((fieldName, i) => {
      const key = `${fieldName}-${i}`;

      if (fieldName === ",") {
        return <span key={key}>,</span>;
      }

      const unabbreviated = getUnabbreviated(fieldName, address);
      if (unabbreviated) {
        return (
          <abbr key={key} title={unabbreviated}>
            {" "}
            {address[fieldName]}
          </abbr>
        );
      }

      return <span key={key}> {address[fieldName]}</span>;
    });

  return <div>{addressLineEls}</div>;
}
