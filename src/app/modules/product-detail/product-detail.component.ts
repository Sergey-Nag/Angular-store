import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallHelper } from '@shared/helpers/api-call.helper';
import { Book } from '@shared/models/book.model';
import { CatalogService } from '../../shared/services/catalog.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  isLoading = true;
  book: Book;  

  constructor(
    private route: ActivatedRoute, 
    private catalog: CatalogService,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    
    ApiCallHelper
      .executeRequest(this.catalog.getBook(bookId))
      .subscribe(({ loading, payload }) => {
        this.isLoading = loading;
        this.book = payload;

        this.cdRef.detectChanges();
      });
  }
}
