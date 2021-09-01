import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { BooksCatalogComponent } from './components/books-catalog/books-catalog.component';
import { CartComponent } from './components/cart/cart.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductInfoComponent } from './components/product-detail/product-info/product-info.component';
import { ProductCalcComponent } from './components/product-detail/product-calc/product-calc.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    ProductDetailComponent,
    BooksCatalogComponent,
    CartComponent,
    HeaderComponent,
    ProductInfoComponent,
    ProductCalcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
