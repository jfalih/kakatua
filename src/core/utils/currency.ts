import {default as LibCurrency} from 'currency.js';

const currency = (val?: number, options?: LibCurrency.Options): string => {
  const libOptions = {
    symbol: 'Rp',
    decimal: ',',
    precision: 0,
    separator: '.',
    ...options,
  };

  return LibCurrency(val || 0, libOptions).format();
};

export default currency;
