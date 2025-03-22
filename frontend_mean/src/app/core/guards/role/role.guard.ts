import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);  // Injection via `inject()`
  const router = inject(Router);  // Injection via `inject()`

  const expectedRole: string[] = route.data['expectedRole'];  // Récupère les rôles attendus depuis les données de la route
  const role: string = authService.getRole();  // Récupère le rôle de l'utilisateur via le service `AuthService`

  // Vérifie si le rôle de l'utilisateur correspond à l'un des rôles attendus
  for (let index = 0; index < expectedRole.length; index++) {
    if (role === expectedRole[index]) {
      return true;  // Si le rôle est valide, autorise l'accès
    }
  }

  // Si le rôle n'est pas valide, redirige l'utilisateur vers la page "forbidden"
  router.navigate(['/forbidden']);
  return false;  // Refuse l'accès
};
