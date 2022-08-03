import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpErrorService } from "@core/services/http-error.service";
import { HttpLoadingService } from "@core/services/http-loading.service";
import { of, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

@Injectable()
export class HttpRequestStateInterceptor implements HttpInterceptor {
    constructor(private loading: HttpLoadingService, private error: HttpErrorService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      this.loading.requestStarted();

      return next.handle(req)
        .pipe(
          catchError((err) => {
            this.error.showError(err);

            return throwError(err);
          }),
          finalize(() => this.loading.requestFinished())
        )
    }
}