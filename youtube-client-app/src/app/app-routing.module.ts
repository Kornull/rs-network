import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './core/guard';

import { NotFoundComponent } from './shared/components';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: 'main',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/main').then(m => m.MainPageModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth').then(m => m.AuthModule),
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
