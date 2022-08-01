import { PriceFilterValues } from "../enums/PriceFilterValues.enum";

type PriceFilterRule = {
  name: string,
  from?: number,
  to?: number,
}

const PriceFilterRules: [PriceFilterRule, PriceFilterRule, PriceFilterRule, PriceFilterRule] = [
  {
    name: 'Price',
  },
  {
    name: '0 < price < 25',
    to: 25,
  },
  {
    name: '25 < price < 50',
    from: 25,
    to: 50,
  },
  {
    name: 'price > 50',
    from: 50,
  },
];

export { PriceFilterRules };
export type { PriceFilterRule };