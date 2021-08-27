import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksCatalogComponent } from './components/books-catalog/books-catalog.component';
import { CartComponent } from './components/cart/cart.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

const routes: Routes = [
  { path: 'catalog', component: CatalogComponent, children: [
    { path: '', pathMatch: 'full', component: BooksCatalogComponent },
    { path: ':id', component: ProductDetailComponent }
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: '', pathMatch: 'full', redirectTo: '/catalog' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
