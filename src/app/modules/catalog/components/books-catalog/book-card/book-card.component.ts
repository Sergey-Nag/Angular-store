import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Book } from '@shared/models/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent {
  @Input() book!: Book;
}
