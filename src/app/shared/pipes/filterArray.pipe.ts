import { Pipe, PipeTransform } from "@angular/core";
import { Book } from "../book.model";

@Pipe({
    name: 'filterArray'
})
export class FilterArrayPipe implements PipeTransform {
    transform(array: Book[], searchTitle: string): Book[] {
        if (!searchTitle) return array;
        
        return array.filter(
            (book: Book) => book.title.toLowerCase().includes(searchTitle.toLowerCase())
        );
    }
}