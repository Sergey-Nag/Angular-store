import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/book.model';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-books-catalog',
  templateUrl: './books-catalog.component.html',
})
export class BooksCatalogComponent implements OnInit {
  books: Book[] = [];

  constructor(private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.catalogService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
    });
  }

  searchFilter(value: string) {
    console.log(value)
  }

}