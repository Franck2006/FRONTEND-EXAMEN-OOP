import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../app/env/enviment.env";


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) { }

    sign_up(email: string, password: string, phone: string) {
        return this.http.post(`${environment.API}/auth/sign-up`, { email, password, phone });
    }

    sign_in(email: string, password: string) {
        return this.http.post(`${environment.API}/auth/sign-in`, { email, password });
    }

    sign_out() {
        return this.http.post(`${environment.API}/auth/sign-out`, {});
    }

    save_token(token: string) {
        localStorage.setItem('token', token);
    }

    get_token() {
        return localStorage.getItem('token');
    }

    log_out() {
        localStorage.removeItem('token');
    }
}