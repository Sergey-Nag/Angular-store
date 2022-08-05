import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-calc',
  templateUrl: './product-calc.component.html',
  styleUrls: ['./product-calc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCalcComponent {
  @Input() price: number;
  @Input() available: number;
  @Input() count: number;
  @Output() countChange = new EventEmitter<number>();

  get totalPrice() {
    return (this.price * this.count).toFixed(2);
  }

  onCountChange(e: Event) {
    this.countChange.emit(this.count);
  }
}
