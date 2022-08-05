import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpLoadingService } from '@core/services/http-loading.service';
import { Book } from '@shared/models/book.model';
import { CatalogService } from '../../shared/services/catalog.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  isLoading$ = this.loading.isLoading$;
  book: Book;  
  count = 0;

  constructor(
    private route: ActivatedRoute, 
    private catalog: CatalogService,
    private cdRef: ChangeDetectorRef,
    private loading: HttpLoadingService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');

    this.catalog.getBook(bookId)
      .subscribe((book: Book) => {
        this.book = book;
        this.count = 1;

        this.cdRef.detectChanges();
      });
  }

  countChange() {
    console.log(this.count);
  }
}
