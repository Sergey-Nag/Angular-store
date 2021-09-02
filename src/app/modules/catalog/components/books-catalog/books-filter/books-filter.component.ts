import { Target } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.scss']
})
export class BooksFilterComponent {
  @Output() searchChanged = new EventEmitter<string>();
  @Output() sortChanged = new EventEmitter<string>();
  constructor() { }

  onInputChanged(event: any) {
    if (event.target.value === '') return;

    this.searchChanged.emit(event.target.value);
  }
}
