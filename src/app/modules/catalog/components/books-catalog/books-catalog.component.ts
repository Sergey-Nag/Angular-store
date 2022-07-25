import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/book.model';
import { PriceFilterValues } from 'src/app/shared/enums/PriceFilterValues.enum';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-books-catalog',
  templateUrl: './books-catalog.component.html',
})
export class BooksCatalogComponent implements OnInit {
  books: Book[] = [];
  searchText = '';
  priceValue: PriceFilterValues = PriceFilterValues.All;

  constructor(private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.catalogService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
    });
  }
}
