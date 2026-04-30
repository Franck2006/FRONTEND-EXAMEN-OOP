import { CanActivateFn } from '@angular/router';

export const adminPageDenyGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem("role") === "USER") {
    return false; // Deny access to admin page for users with "USER" role    
  } else if (localStorage.getItem("role") === "ADMIN") {
    return true; // Allow access to admin page for users with "ADMIN" role
  }
  else if (localStorage.getItem("role") === "SUPER_ADMIN") {
    return true; // Allow access to admin page for users with "ADMIN" role
  } else if (localStorage.getItem("role") === null) {
    return false;
  }
  return false; // Deny access for any other cases (e.g., if role is not set or has an unexpected value)
};
