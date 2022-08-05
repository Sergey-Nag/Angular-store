import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { PriceFilterValues } from 'src/app/shared/enums/PriceFilterValues.enum';
import { CatalogService } from '../../../../shared/services/catalog.service';
import { ApiCallHelper } from '@shared/helpers/api-call.helper';

@Component({
  selector: 'app-books-catalog',
  templateUrl: './books-catalog.component.html',
})
export class BooksCatalogComponent implements OnInit {
  books: Book[];
  searchTerm = '';
  priceTerm: PriceFilterValues = PriceFilterValues.All;
  isLoading = true;

  constructor(private catalogService: CatalogService) { }

  formChangeHandler({searchTerm, priceTerm}: { searchTerm: string, priceTerm: PriceFilterValues}) {
    this.searchTerm = searchTerm;
    this.priceTerm = priceTerm;
  }

  ngOnInit(): void {
    ApiCallHelper
      .executeRequest(this.catalogService.getBooks())
      .subscribe(({ loading, payload }) => {
        this.isLoading = loading;
        this.books = payload;
      });
  }
}
