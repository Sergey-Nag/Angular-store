import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './modules/catalog/catalog.component';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
