import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SetPageByRoleHook {
  constructor(private router: Router) {}

  getPageByRole() {
    const role = localStorage.getItem('role')?.toLowerCase() || '';
    if (role === 'super_admin' || role === 'admin') {
      this.router.navigate(['/dashboard-page']);
    } else if (role === 'user') {
      this.router.navigate(['/welcome-landing-page']);
    } else if (role === 'doctor') {
      this.router.navigate(['/dashboard-page']);
    } else if (role === 'patient') {
      this.router.navigate(['/dashboard-page']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
