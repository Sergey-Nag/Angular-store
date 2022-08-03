import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-calc',
  templateUrl: './product-calc.component.html',
  styleUrls: ['./product-calc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCalcComponent {
  @Input() price: number;
  @Input() count: number;

  get totalPrice() {
    return this.price
  }

  constructor() { }

}
