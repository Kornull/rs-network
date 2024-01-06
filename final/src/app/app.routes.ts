import { Routes } from '@angular/router';
import { authGuard } from './core/guard';
import { NotFoundComponent } from './shared';
import {
  AuthComponent,
  DialogComponent,
  MainComponent,
  PersonalDialogComponent,
  ProfileComponent,
  RegistrationComponent,
} from './pages';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [authGuard],
    component: MainComponent,
  },
  {
    path: 'signin',
    component: AuthComponent,
  },
  {
    path: 'signup',
    component: RegistrationComponent,
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    component: ProfileComponent,
  },
  {
    path: 'group/:id',
    canActivate: [authGuard],
    component: DialogComponent,
  },
  {
    path: 'conversation/:id',
    canActivate: [authGuard],
    component: PersonalDialogComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
