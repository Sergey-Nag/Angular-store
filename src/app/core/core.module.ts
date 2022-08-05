import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptorService } from './interceptors/auth.interceptor';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
  ],
  exports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ],
})
export class CoreModule { }
