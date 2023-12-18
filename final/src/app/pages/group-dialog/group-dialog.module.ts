import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupDialogComponent } from './components/group-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: GroupDialogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupDialogRoutingModule {}
