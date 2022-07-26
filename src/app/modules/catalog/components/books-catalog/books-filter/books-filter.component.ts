import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PriceFilterRules } from 'src/app/shared/constants/PriceFIlterRules';
import { PriceFilterValues } from 'src/app/shared/enums/PriceFilterValues.enum';

@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.scss']
})
export class BooksFilterComponent implements OnInit, OnDestroy {
  @Output() filterChange = new EventEmitter<any>();
  private formSub: Subscription;
  filterForm: FormGroup;
  priceFilterRules = PriceFilterRules.map(({ name }) => name);

  constructor() {
    this.filterForm = new FormGroup({
      searchTerm: new FormControl(),
      priceTerm: new FormControl(PriceFilterValues.All)
    });
  }

  ngOnInit(): void {
    this.formSub = this.filterForm.valueChanges.subscribe((values) => {
      this.filterChange.emit(values);
    });
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }
}
