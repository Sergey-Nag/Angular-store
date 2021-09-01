import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "../models/user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    username: string;
    avatar: string;
    token: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    auth = new Subject<boolean>();
    user = new BehaviorSubject<User | null>(null);

    constructor(private http: HttpClient, private router: Router) {}

    setAuth(isAuth: boolean) {
        this.auth.next(isAuth);
    }

    signIn(username: string) {
        return this.http.post<AuthResponseData>('https://js-band-store-api.glitch.me/signin', {
            username,
        }).pipe(tap(this.handleAuth.bind(this)));
    }

    autoSignIn() {
        const userData = localStorage.getItem('user-data');
        if (userData) {
            const user: AuthResponseData = JSON.parse(userData);
            this.user.next(new User(user.username, user.avatar, user.token));
            this.setAuth(true);
        }
    }

    signOut() {
        this.user.next(null);
        this.setAuth(false);
        localStorage.removeItem('user-data');
        this.router.navigate(['/login']);
    }

    private handleAuth(data: AuthResponseData) {
        localStorage.setItem('user-data', JSON.stringify(data));
        this.user.next(new User(data.username, data.avatar, data.token));
    }
}