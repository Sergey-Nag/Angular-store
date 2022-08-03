import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpLoadingService } from '@core/services/http-loading.service';
import { Book } from '@shared/models/book.model';
import { Observable, Subscription } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { CatalogService } from '../../shared/services/catalog.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  book: Book;
  
  isLoading = this.loading.isLoading;

  constructor(
    private route: ActivatedRoute, 
    private catalog: CatalogService,
    private cdRef: ChangeDetectorRef,
    private loading: HttpLoadingService
  ) {}

  ngOnInit(): void {
    this.paramsSub = this.route.paramMap
      .pipe(
        switchMap((params) => params.get('id')),
        switchMap((id) => this.catalog.getBook(id)),
      )
      .subscribe((book: Book) => {
        this.book = book;

        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

}
