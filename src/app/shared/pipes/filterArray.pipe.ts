import { Pipe, PipeTransform } from "@angular/core";
import { Book } from "../book.model";
import { PriceFilterValues } from "../enums/PriceFilterValues.enum";

@Pipe({
    name: 'filterArray'
})
export class FilterArrayPipe implements PipeTransform {
    transform(array: Book[], searchTitle: string, priceFilter?: PriceFilterValues): Book[] {
        if (!searchTitle && !priceFilter) return array;
        
        return array.filter(
            (book: Book) => 
                this.isTitleMatch(book.title, searchTitle) && this.isPriceMatch(book.price, priceFilter)
        );
    }

    private isTitleMatch(title: string, searchTitle: string): boolean {
        if (!searchTitle) return true;

        const searchAlias = searchTitle.toLowerCase().replace(/\W/g, '');
        const titleAlias = title.toLowerCase().replace(/\W/g, '');

        return titleAlias.includes(searchAlias);
    }

    private isPriceMatch(price: number, priceFilter: PriceFilterValues): boolean {
        switch(priceFilter) {
            case PriceFilterValues.Under25:
                return price < 25;
            case PriceFilterValues.Between25and50:
                return price >= 25 && price <= 50;
            case PriceFilterValues.Above50:
                return price > 50;
            default:
                return true;
        }
    }
}