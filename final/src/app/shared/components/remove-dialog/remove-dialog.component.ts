import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
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
import { ConversationActions, LoggedActions } from '../../../core/store/redux';
import { ModalData } from '../modal/modal.component';

@Component({
  selector: 'app-modal',
  templateUrl: './remove-dialog.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  styleUrl: './remove-dialog.component.scss',
})
export class RemoveDialogComponent {
  title: string = '';

  isPersonalMesg: boolean = false;

  constructor(
    public modal: MatDialog,
    public router: Router,
    private store: Store,
    @Inject(MAT_DIALOG_DATA)
    public data: ModalData
  ) {
    this.title = data.title;
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
