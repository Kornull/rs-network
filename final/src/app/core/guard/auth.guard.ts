import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import AuthService from '../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const route: Router = inject(Router);

  const auth = inject(AuthService);

  const res = auth.isLoggedUser();
  if (!res) {
    route.navigate(['/signin']);
    return res;
  }

  return res;
};
