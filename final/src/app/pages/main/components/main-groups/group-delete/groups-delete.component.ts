import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModalData } from '../../../../../shared';
import { LoggedActions } from '../../../../../core/store/redux';

@Component({
  selector: 'app-modal',
  templateUrl: './groups-delete.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  styleUrl: './groups-delete.component.scss',
})
export class GroupDeleteComponent {
  title: string = '';

  constructor(
    public modal: MatDialog,
    private store: Store,
    @Inject(MAT_DIALOG_DATA)
    public data: ModalData
  ) {
    this.title = data.groupTitle;
  }

  onNoClick(): void {
    this.modal.closeAll();
  }

  removeGroup() {
    console.log(this.data);
    this.store.dispatch(
      LoggedActions.removeOwnGroup({ groupId: this.data.groupId })
    );
  }
}
