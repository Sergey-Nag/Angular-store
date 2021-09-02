import { Target } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.scss']
})
export class BooksFilterComponent {
  @Input() search: string;
  @Output() searchChange = new EventEmitter<string>();
  @Input() price: 0 | 1 | 2 | 3;
  @Output() priceChange = new EventEmitter<0 | 1 | 2 | 3>();

  constructor() { }

  onInputChange(value: string) {
    this.search = value;
    this.searchChange.emit(value);
  }

  onSelectChange(value: 0 | 1 | 2 | 3) {
    this.price = value;
    this.priceChange.emit(value);
  }
}
