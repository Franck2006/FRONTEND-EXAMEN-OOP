import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const acces_token = localStorage.getItem('access_token');
  if (acces_token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${acces_token}`
      }
    });
    return next(authReq);
  }
  return next(req);
};
