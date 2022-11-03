import Yext from '@yext/types';
import { AddressPart } from './types';
import { getUnabbreviated } from './methods';
import { ReactElement } from 'react';

export type AddressLineProps = {
  address: Yext.Address,
  line: AddressPart,
  separator?: string
};

export const AddressLine = ({
  address,
  line,
  separator,
}: AddressLineProps) => {
  const addressLineEls: ReactElement[] = [];

  for (const field of line) {
    if (field === ',') {
      addressLineEls.push(<span key={field}>{separator}</span>);
      continue;
    }

    const value = address[field];
    if (!value) {
      continue;
    }

    // Include unabbreviated tooltip if available
    const unabbreviated = getUnabbreviated(field, address);
    if (unabbreviated) {
      addressLineEls.push(
        <abbr key={field} title={unabbreviated}>
          {' '}
          {value}
        </abbr>
      );
      continue;
    }

    addressLineEls.push(<span key={field}> {value}</span>);
  }

  return <div>{addressLineEls}</div>;
};
