import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, catchError, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
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
import RequestsService from '../../../core/services/requests/requests.service';
import SnackBarService from '../../../core/services/snack-bar/snack-bar.service';
import ErrorService from '../../../core/services/error/error.service';

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

  btnDisabled: boolean = false;

  isPersonalMesg: boolean = false;

  constructor(
    public modal: MatDialog,
    public router: Router,
    private store: Store,
    private request: RequestsService,
    private toast: SnackBarService,
    private errorService: ErrorService,
    @Inject(MAT_DIALOG_DATA)
    public data: ModalData
  ) {
    this.title = data.title;
    this.isPersonalMesg = !data.isGroup;
  }

  onNoClick(): void {
    this.modal.closeAll();
  }

  removeDialog() {
    this.btnDisabled = true;
    if (this.isPersonalMesg) {
      this.request
        .deleteConversation(this.data.id)
        .pipe(
          map(() => {
            this.store.dispatch(
              ConversationActions.delistConversation({
                userId: this.data.id,
              })
            );
            this.toast.openSnack('Conversation has been deleted', false);
            this.modal.closeAll();
            this.router.navigate(['/']);
          }),
          catchError((err: HttpErrorResponse) => {
            this.btnDisabled = false;
            this.errorService.showError(err);
            return EMPTY;
          })
        )
        .subscribe();
    } else {
      this.request
        .deleteOwnGroup(this.data.id)
        .pipe(
          map(() => {
            this.store.dispatch(
              LoggedActions.delistOwnGroup({
                groupId: this.data.id,
              })
            );
            this.toast.openSnack('Group has been deleted', false);
            this.modal.closeAll();
            if (this.data.isOpenGroup) this.router.navigate(['/']);
          }),
          catchError((err: HttpErrorResponse) => {
            this.btnDisabled = false;
            this.errorService.showError(err);
            return EMPTY;
          })
        )
        .subscribe();
    }
  }
}
