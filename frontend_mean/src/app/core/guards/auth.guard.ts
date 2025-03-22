import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService :any = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

  
};
