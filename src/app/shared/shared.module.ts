import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HeaderComponent } from './components/header/header.component';
import { NameFilterPipe } from './pipes/nameFilter.pipe';
import { PriceFilterPipe } from './pipes/priceFilter.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    CartComponent,
    HeaderComponent,
    NameFilterPipe,
    PriceFilterPipe,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    NameFilterPipe,
    PriceFilterPipe,
    HeaderComponent,
    RouterModule,
    SpinnerComponent,
  ]
})
export class SharedModule { }
