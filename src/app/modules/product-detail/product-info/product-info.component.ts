import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ParamMap, RouterStateSnapshot } from '@angular/router';
import { Book } from '@shared/models/book.model';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductInfoComponent implements OnInit {
  @Input() book: Book;

  ngOnInit(): void {
    console.log(this.book);
  }
}
