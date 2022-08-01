import { Pipe, PipeTransform } from "@angular/core";
import { PriceFilterRule, PriceFilterRules } from "../constants/PriceFIlterRules";
import { PriceFilterValues } from "../enums/PriceFilterValues.enum";
import { Book } from "../models/book.model";

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {
  transform(arr: Book[], priceTerm: PriceFilterValues) {
    if (!priceTerm) return arr;
    
    const filterRule = PriceFilterRules[priceTerm];

    return arr.filter((book) => this.isPriceMatch(book.price, filterRule));
  }

  private isPriceMatch(price: number, { from, to }: PriceFilterRule): boolean {
    const result: [boolean?, boolean?] = [];

    if (from) result.push(price >= from);

    if (to) result.push(price <= to);

    return result.every(isMatch => isMatch);
  }
  
}