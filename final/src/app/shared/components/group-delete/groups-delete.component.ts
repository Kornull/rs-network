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
import { ModalData } from '../..';
import { ConversationActions, LoggedActions } from '../../../core/store/redux';
import { Router } from '@angular/router';

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

  isPersonalMesg: boolean = false;

  constructor(
    public modal: MatDialog,
    public router: Router,
    private store: Store,
    @Inject(MAT_DIALOG_DATA)
    public data: ModalData
  ) {
    this.title = data.groupTitle;
    this.isPersonalMesg = data.isPersonal || false;
  }

  onNoClick(): void {
    this.modal.closeAll();
  }

  removeGroup() {
    if (this.isPersonalMesg) {
      this.store.dispatch(
        ConversationActions.removeDialog({ userId: this.data.id })
      );
    } else {
      this.store.dispatch(
        LoggedActions.removeOwnGroup({ groupId: this.data.id })
      );
    }
    this.router.navigate(['/']);
  }

}
