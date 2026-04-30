import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../app/env/enviment.env";
import { tap } from "rxjs";
import type { ModelAppInterfaces } from "../models/type.model";


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) { }

    sign_up(sign_up_form: ModelAppInterfaces.SignUp) {
        return this.http
            .post(`${environment.API}/auth/sign-up`, sign_up_form)
            .pipe(
                tap((response: any) => {
                    if (response && response.access_token) {
                        localStorage.setItem('access_token', response.access_token);
                    }
                }),
            );
    }

    sign_in(sign_in_form: ModelAppInterfaces.SignIn) {
        return this.http
            .post(`${environment.API}/auth/sign-in`, sign_in_form)
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