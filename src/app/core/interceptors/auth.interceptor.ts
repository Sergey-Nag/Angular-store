import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "@shared/models/user.model";
import { of, throwError } from "rxjs";
import { catchError, exhaustMap, take } from "rxjs/operators";
import { AuthService } from "../../modules/auth/services/auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user$.pipe(
            exhaustMap((user: User | null) => {
                if (!user) return next.handle(req);

                const modifiedReq = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${user.token}`)
                });
                
                return next.handle(modifiedReq)
                    .pipe(
                        catchError((err: HttpErrorResponse) => {
                            if (err.status === 401) this.authService.signOut();
                            
                            return throwError(err);
                        })
                    );
            })
        );
    }
}