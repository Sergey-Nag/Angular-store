import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isAuth = new Subject<boolean>();
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) {}

    setAuth(isAuth: boolean) {
        this.isAuth.next(isAuth);
    }

    signIn(username: string) {
        return this.http.post<User>('https://js-band-store-api.glitch.me/signin', {
            username,
        }).pipe(
            tap((user: User) => this.handleAuth(user))
        );
    }

    autoSignIn() {
        const userData = localStorage.getItem('user-data');
        if (userData) {
            const user: User = JSON.parse(userData);
            this.user.next(new User(user));
            this.setAuth(true);
        }
    }

    signOut() {
        this.user.next(null);
        this.setAuth(false);
        localStorage.removeItem('user-data');
        this.router.navigate(['/login']);
    }

    private handleAuth(data: User) {
        localStorage.setItem('user-data', JSON.stringify(data));
        this.user.next(new User(data));
    }
}