import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  {
    path: 'main',
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
