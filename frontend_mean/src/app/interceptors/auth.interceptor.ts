import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../shared/services/auth/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getToken(); // Injection de AuthService

  const clonedReq = authToken
    ? req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } })
    : req;


  return next(clonedReq);
};
