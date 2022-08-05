import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SpinnerComponent } from "@shared/components/spinner/spinner.component";
import { SharedModule } from "@shared/shared.module";
import { ProductCalcComponent } from "./product-calc/product-calc.component";
import { ProductDetailComponent } from "./product-detail.component";
import { ProductInfoComponent } from "./product-info/product-info.component";

const routes: Routes = [
  { path: '', component: ProductDetailComponent}
];

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductInfoComponent,
    ProductCalcComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductDetailModule {}