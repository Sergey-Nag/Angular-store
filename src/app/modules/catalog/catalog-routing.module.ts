import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksCatalogComponent } from './components/books-catalog/books-catalog.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BooksCatalogComponent },
  { path: ':id', component: ProductDetailComponent }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }