import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'about/:id',
    loadChildren: () => import('../about-card').then(m => m.AboutCardModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin').then(m => m.AdminModule),
  },
  {
    path: 'favorite',
    loadChildren: () => import('../favorite').then(m => m.FavoriteModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
