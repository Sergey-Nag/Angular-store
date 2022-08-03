import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {
  error = new Subject<HttpErrorResponse>();

  showError(error: HttpErrorResponse) {
    this.error.next(error);
  }

  hideError() {
    this.error.next(null);
  }
}
