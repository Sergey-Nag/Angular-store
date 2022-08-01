import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
})
export class BooksListComponent {
  @Input() books: Book[];
  constructor() { }

}
