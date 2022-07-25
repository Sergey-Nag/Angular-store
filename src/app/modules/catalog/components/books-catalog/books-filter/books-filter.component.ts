import { Target } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PriceFilterValues } from 'src/app/shared/enums/PriceFilterValues.enum';

@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.scss']
})
export class BooksFilterComponent {
  @Input() search: string;
  @Output() searchChange = new EventEmitter<string>();
  @Input() price: PriceFilterValues;
  @Output() priceChange = new EventEmitter<PriceFilterValues>();

  constructor() { }

  onInputChange(value: string) {
    this.search = value;
    this.searchChange.emit(this.search);
  }

  onSelectChange(value: '0' | '1' | '2' | '3') {
    this.price = +value;
    this.priceChange.emit(this.price);
  }
}
