import { HttpRequest } from "@angular/common/http";
import { combineLatest, concat, Observable, of } from "rxjs";
import { catchError, combineAll, concatMap, map, startWith, switchMap } from "rxjs/operators";

type ApiCallResponse<T> = {
  loading: boolean,
  payload: T | null,
  error: boolean
}

export class ApiCallHelper {
  static executeRequest<T>(req$: Observable<T>): Observable<ApiCallResponse<T>> {
    return req$.pipe(
      map(payload => ({ loading: false, payload, error: false})),
      startWith({ loading: true, payload: null, error: false}),
      catchError(() => of({ loading: false, payload: null, error: true}))
    )
  }
}