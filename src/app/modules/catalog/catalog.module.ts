import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogRoutingModule } from './catalog-routing.module';
import { BooksCatalogComponent } from './components/books-catalog/books-catalog.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductCalcComponent } from './components/product-detail/product-calc/product-calc.component';
import { ProductInfoComponent } from './components/product-detail/product-info/product-info.component';
import { BooksFilterComponent } from './components/books-catalog/books-filter/books-filter.component';
import { BooksListComponent } from './components/books-catalog/books-list/books-list.component';
import { BookCardComponent } from './components/books-catalog/book-card/book-card.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    BooksCatalogComponent,
    ProductDetailComponent,
    ProductInfoComponent,
    ProductCalcComponent,
    BooksFilterComponent,
    BooksListComponent,
    BookCardComponent,
  ],
  imports: [
    CatalogRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CatalogModule { }
