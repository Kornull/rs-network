import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components';
import { FavoriteResultComponent } from '../favorite/components/favorite-result/favorite-result.component';

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
    component: FavoriteResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
