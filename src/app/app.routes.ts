import { Routes } from '@angular/router';
import { SignIn } from './auth/sign-in/sign-in';
import { SignUp } from './auth/sign-up/sign-up';
import { SignOut } from './auth/sign-out/sign-out';
import { WelcomeLandingPage } from './pages/welcome-landing-page/welcome-landing-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';

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
    {
        path: 'welcome-landing-page',
        component: WelcomeLandingPage
    },
    {
        path: 'dashboard-page',
        component: DashboardPage
    },
    {
        path: '**',
        redirectTo: 'sign-in',
    }
];
