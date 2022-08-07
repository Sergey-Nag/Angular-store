import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-calc',
  templateUrl: './product-calc.component.html',
  styleUrls: ['./product-calc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCalcComponent {
  @Input() price: number;
  @Input() available: number;
  @Output() onCountChange = new EventEmitter<number>();
  
  count = 1;

  get totalPrice() {
    return (this.price * this.count).toFixed(2);
  }

  handleCountChange(e: Event) {
    const value = +(e.target as HTMLInputElement).value;

    this.count = Math.min(Math.max(value, 0), this.available);

    this.onCountChange.emit(this.count);
  }
}
