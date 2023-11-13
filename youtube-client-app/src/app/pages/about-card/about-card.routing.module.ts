import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardBlockComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: CardBlockComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutCardRoutingModule {}
