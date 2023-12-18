import { Routes } from '@angular/router';
import { authGuard } from './core/guard';
import { NotFoundComponent } from './shared';

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
  {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/profile/profile.module').then(m => m.RegistrationModule),
  },
  {
    path: 'group/:id',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/group-dialog/group-dialog.module').then(
        m => m.GroupDialogRoutingModule
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
