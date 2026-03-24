import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();
  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }
  return next(req);
};
