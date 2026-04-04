import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../app/env/enviment.env";
import { tap } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) { }

    sign_up(email: string, password: string, phone: string) {
        return this.http
            .post(`${environment.API}/auth/sign-up`, { email, password, phone })
            .pipe(
                tap((response: any) => {
                    if (response && response.access_token) {
                        localStorage.setItem('access_token', response.access_token);
                    }
                }),
            );
    }

    sign_in(email: string, password: string) {
        return this.http
            .post(`${environment.API}/auth/sign-in`, { email, password })
            .pipe(
                tap((response: any) => {
                    if (response && response.access_token) {
                        localStorage.setItem('access_token', response.access_token);
                    }
                }),
            );
    }

    sign_out() {
        return this.http.post(`${environment.API}/auth/sign-out`, {});
    }

    log_out() {
        localStorage.removeItem('access_token');
    }
}