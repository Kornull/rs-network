import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

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
import { LoggedActions } from '../../../core/store/redux';

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
    private router: Router,
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
    this.store.dispatch(
      LoggedActions.removeOwnGroup({ groupId: this.data.groupId })
    );
    if (this.data.isOpenGroup) {
      this.router.navigate(['/']);
    }
  }
}
