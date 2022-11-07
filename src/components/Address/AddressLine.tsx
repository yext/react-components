import Yext from '@yext/types';
import { AddressFieldName } from './types';
import { getUnabbreviated } from './methods';
import { ReactElement } from 'react';

/**
 * The shape of the data passed to {@link AddressLine}.
 */
export interface AddressLineProps {
  /** The address field from Knowledge Graph. */
  address: Yext.Address,
  /** The format to display for the particular address line. */
  line: AddressFieldName[],
  /** Sets a custom separator. Defaults to a comma. */
  separator: string
}

export function AddressLine({
  address,
  line,
  separator,
}: AddressLineProps) {
  const addressLineEls: ReactElement[] = line
    .filter((fieldName) => fieldName === ',' || address[fieldName])
    .map((fieldName, i) => {
      if (fieldName === ',') {
        return <>{separator}</>;
      }

      const key = `${fieldName}-${i}`;

      const unabbreviated = getUnabbreviated(fieldName, address);
      if (unabbreviated) {
        return (<abbr key={key} title={unabbreviated}> {address[fieldName]}</abbr>);
      }

      return (<span key={key}> {address[fieldName]}</span>);
    });

  return <div>{addressLineEls}</div>;
}
