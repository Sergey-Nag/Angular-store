import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { PriceFilterValues } from 'src/app/shared/enums/PriceFilterValues.enum';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-books-catalog',
  templateUrl: './books-catalog.component.html',
})
export class BooksCatalogComponent implements OnInit {
  books: Book[] = [];
  searchTerm = '';
  priceTerm: PriceFilterValues = PriceFilterValues.All;

  constructor(private catalogService: CatalogService) { }

  formChangeHandler({searchTerm, priceTerm}: { searchTerm: string, priceTerm: PriceFilterValues}) {
    this.searchTerm = searchTerm;
    this.priceTerm = priceTerm;
  }

  ngOnInit(): void {
    this.catalogService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
    });
  }
}
