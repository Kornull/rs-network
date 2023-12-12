import { Routes } from '@angular/router';
import { authGuard } from './core/guard';

export const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: 'main',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/main/main.module').then(m => m.MainModule),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/registration/registration.module').then(
        m => m.RegistrationModule
      ),
  },
];
