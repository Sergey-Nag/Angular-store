import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { PriceFilterValues } from 'src/app/shared/enums/PriceFilterValues.enum';
import { CatalogService } from '../../../../shared/services/catalog.service';
import { HttpLoadingService } from '@core/services/http-loading.service';

@Component({
  selector: 'app-books-catalog',
  templateUrl: './books-catalog.component.html',
})
export class BooksCatalogComponent implements OnInit {
  books: Book[];
  searchTerm = '';
  priceTerm: PriceFilterValues = PriceFilterValues.All;
  isLoading = this.loading.isLoading;

  constructor(private catalogService: CatalogService, private loading: HttpLoadingService) { }

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
