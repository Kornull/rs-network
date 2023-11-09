import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'about/:id',
    loadChildren: () =>
      import('../about-card/about-card.module').then(m => m.AboutCardModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../admin/admin.module').then(m => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
