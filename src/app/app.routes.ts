import { Routes } from '@angular/router';
import { SignIn } from './auth/sign-in/sign-in';
import { SignUp } from './auth/sign-up/sign-up';
import { SignOut } from './auth/sign-out/sign-out';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
    },
    {
        path: 'sign-in',
        component: SignIn,
    },
    {
        path: 'sign-up',
        component: SignUp,
    },
    {
        path: 'sign-out',
        component: SignOut,
    },
];
