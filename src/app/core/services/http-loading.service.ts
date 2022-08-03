import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpLoadingService {
  isLoading$ = new BehaviorSubject(false);

  requestStarted() {
    this.isLoading$.next(true);
  }

  requestFinished() {
    this.isLoading$.next(false);
  }
}
