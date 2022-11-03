import Yext from '@yext/types';

/**
 * Get the unabbreviated version of a field if available
 *
 * getUnabbreviated('countryCode', address) returns 'United States'
 *
 * @param field - an address field name
 * @param address - a Yext address
 * @returns the unabbreviated version of the field
 */
 export const getUnabbreviated = (
  field: keyof Yext.Address,
  address: Yext.Address
): string | undefined => {
  const abbrFields: { [k: string]: keyof Yext.Address } = {
    region: 'localizedRegionName',
    countryCode: 'localizedCountryName',
  };

  const unabbreviatedField = abbrFields[field];

  return unabbreviatedField && address[unabbreviatedField];
};