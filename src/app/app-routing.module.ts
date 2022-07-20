import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksCatalogComponent } from './components/books-catalog/books-catalog.component';
import { CartComponent } from './components/cart/cart.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';

const routes: Routes = [
  { path: 'catalog', component: CatalogComponent, canActivate: [AuthGuard], children: [
    { path: '', pathMatch: 'full', component: BooksCatalogComponent },
    { path: ':id', component: ProductDetailComponent }
  ]},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: '/catalog' },
  { path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
