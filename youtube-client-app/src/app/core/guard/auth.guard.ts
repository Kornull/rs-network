import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { LoginService } from '../services';

export const authGuard: CanActivateFn = () => {
  const isLogged: LoginService = inject(LoginService);
  const route: Router = inject(Router);

  if (isLogged.getLog()) {
    return true;
  }

  route.navigate(['/auth']);
  return false;
};
