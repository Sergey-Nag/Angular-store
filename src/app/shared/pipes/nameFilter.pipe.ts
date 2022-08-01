import { Pipe, PipeTransform } from "@angular/core";
import { Book } from "../models/book.model";

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform{
  transform(arr: Book[], searchTerm: string) {
    if (!searchTerm) return arr;

    return arr.filter((book) => {
      const searchAlias = searchTerm.toLowerCase().replace(/\W/g, '');
      const titleAlias = book.title.toLowerCase().replace(/\W/g, '');

      return titleAlias.includes(searchAlias);
    });
  }

}