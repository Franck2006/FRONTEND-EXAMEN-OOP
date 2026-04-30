import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token =  (localStorage.getItem('access_token') || '').trim()
  if (token) {
    const clonedTOken =  req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    })

    return next(clonedTOken)
  }

  console.log(req)
  return next(req);

};
