import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    auth = new Subject<boolean>();

    setAuth(isAuth: boolean) {
        this.auth.next(isAuth);
    }
}