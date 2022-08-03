import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksCatalogComponent } from './components/books-catalog/books-catalog.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BooksCatalogComponent },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }