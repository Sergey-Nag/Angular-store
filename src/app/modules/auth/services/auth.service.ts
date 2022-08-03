import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { API_ENDPOINTS } from "src/app/shared/constants/Api.constant";
import { getLocalAuthState, removeLocalAuthState, setlocalAuthState } from "../helpers/localAuthState";
import { User } from "@shared/models/user.model";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user$ = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) {}

    signIn(username: string) {
        return this.http.post<User>(API_ENDPOINTS.SignIn, {
            username,
        }).pipe(
            tap((user: User) => this.handleAuth(user))
        );
    }

    autoSignIn() {
        const user = getLocalAuthState();
        if (user) {
            this.user$.next(user);
        }
    }

    signOut() {
        removeLocalAuthState();
        this.user$.next(null);
        this.router.navigate(['/login']);
    }

    private handleAuth(data: User) {
        setlocalAuthState(data);
        this.user$.next(new User(data));
    }
}