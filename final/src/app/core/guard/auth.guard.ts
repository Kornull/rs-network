import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStoreKeys } from '../store/models';

export const authGuard: CanActivateFn = () => {
  const route: Router = inject(Router);

  const dataUser = localStorage.getItem(LocalStoreKeys.AUTH_USER);
  const result = dataUser !== null ? JSON.parse(dataUser) : null;

  if (result !== null) {
    return true;
  }

  route.navigate(['/signin']);
  return false;
};
