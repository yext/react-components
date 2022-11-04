import Yext from '@yext/types';
import { AddressFieldName } from './types';

/**
 * Get the unabbreviated version of a field if available
 *
 * getUnabbreviated('countryCode', address) returns 'United States'
 *
 * @param field - an address field name
 * @param address - a Yext address
 * @returns the unabbreviated version of the field
 */
export function getUnabbreviated(
  field: AddressFieldName,
  address: Yext.Address
): string | undefined {
  const abbrFields: Record<string, AddressFieldName> = {
    region: 'localizedRegionName',
    countryCode: 'localizedCountryName',
  };

  const unabbreviatedField = abbrFields[field];

  return unabbreviatedField && address[unabbreviatedField];
}
