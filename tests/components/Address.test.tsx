import { render, screen } from '@testing-library/react';
import { Address } from '../../src/components/Address';
import {
  BR_ADDRESS,
  US_ADDRESS,
} from '../__fixtures__/km/address';

describe('Address', () => {
  it('properly renders a localized US address', () => {
    render(<Address address={US_ADDRESS} />);

    const line1El = screen.getByText(US_ADDRESS.line1);
    const cityEl = screen.getByText(US_ADDRESS.city);
    const regionEl = screen.getByText('AL');
    const postalEl = screen.getByText(US_ADDRESS.postalCode);
    const countryEl = screen.getByText(US_ADDRESS.countryCode);

    expect(line1El && cityEl && regionEl && postalEl && countryEl).toBeTruthy();
  });

  it('properly renders a localized BR address', () => {
    render(<Address address={BR_ADDRESS} />);

    const line1El = screen.getByText(BR_ADDRESS.line1);
    const line2El = screen.getByText('Portão 3');
    const sublocalityEl = screen.getByText('Maracanã');
    const cityEl = screen.getByText(BR_ADDRESS.city);
    const regionEl = screen.getByText('RJ');
    const postalEl = screen.getByText(BR_ADDRESS.postalCode);
    const countryEl = screen.getByText(BR_ADDRESS.countryCode);

    expect(line1El && line2El && sublocalityEl && cityEl && regionEl && postalEl && countryEl).toBeTruthy();
  });

  it('properly renders a US address with abbreviated country', () => {
    render(<Address address={US_ADDRESS} />);

    const abbreviatedCountry = screen.getByText(US_ADDRESS.countryCode);
    const fullCountry = screen.getByTitle('United States');

    expect(abbreviatedCountry).toEqual(fullCountry);
  });

  it('properly renders a US address with abbreviated region', () => {
    render(<Address address={US_ADDRESS} />);

    const abbreviatedRegion = screen.getByText('AL');
    const fullRegion = screen.getByTitle('Alabama');

    expect(abbreviatedRegion).toEqual(fullRegion);
  });

  it('properly renders a US address with a custom separator', () => {
    const separator = '.';

    render(<Address address={US_ADDRESS} separator={separator} />);

    const separatorEl = screen.getAllByText(separator);
    expect(separatorEl).toBeTruthy();
  });

  it('properly renders a single AddressPart', () => {
    render(<Address address={US_ADDRESS} lines={[['line1']]} />);

    const line1El = screen.getByText(US_ADDRESS.line1);
    const cityEl = screen.queryByText(US_ADDRESS.city);
    const regionEl = screen.queryByText('AL');
    const postalEl = screen.queryByText(US_ADDRESS.postalCode);
    const countryEl = screen.queryByText(US_ADDRESS.countryCode);

    expect(line1El).toBeTruthy();
    expect(cityEl && regionEl && postalEl && countryEl).toBeFalsy();
  });
});
