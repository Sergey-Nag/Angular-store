import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { CartComponent } from '@shared/components/cart/cart.component';

const routes: Routes = [
  { path: 'catalog', canActivate: [AuthGuard], loadChildren: () => import('./modules/catalog/catalog.module').then(m => m.CatalogModule) },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: '/catalog' },
  { path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
