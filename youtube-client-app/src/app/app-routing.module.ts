import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/main/main.module').then(m => m.MainPageModule),
  },
  {
    path: 'about/:id',
    loadChildren: () =>
      import('./pages/about-card/about-card.module').then(
        m => m.AboutCardModule
      ),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
