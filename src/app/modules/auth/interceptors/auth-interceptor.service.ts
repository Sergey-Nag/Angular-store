import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap((user: User | null) => {
                if (!user) return next.handle(req);

                const modifiedReq = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${user.token}`)
                });
                
                return next.handle(modifiedReq);
            })
        );
    }
}