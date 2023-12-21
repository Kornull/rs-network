import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { ConversationActions } from './action-types';

import SnackBarService from '../../services/snack-bar/snack-bar.service';
import RequestsService from '../../services/requests/requests.service';
import ClearStoreService from '../../services/clear-store/clear.service';
import ErrorService from '../../services/error/error.service';

@Injectable()
export class ConversationEffects {
  constructor(
    private actions$: Actions,
    private toast: SnackBarService,
    private request: RequestsService,
    private router: Router,
    private clear: ClearStoreService,
    private errorService: ErrorService,

    public modal: MatDialog
  ) {}

  getGroupAllMessages = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.getGroupMessages),
      exhaustMap(data => {
        return this.request
          .getMessagesToGroup(data.dialog.groupId, data.dialog.since)
          .pipe(
            map(messageData => {
              this.toast.openSnack('Messages updated', false);
              return ConversationActions.setGroupMessages({
                dialog: {
                  groupId: data.dialog.groupId,
                  messageList: messageData.Items,
                },
              });
            }),
            catchError((err: HttpErrorResponse) => {
              this.errorService.showError(err);
              return EMPTY;
            })
          );
      })
    );
  });

  getPersonalAllMessages = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.getUserMessages),
      exhaustMap(data => {
        return this.request
          .getPersonalMessages(data.dialog.userId, data.dialog.since)
          .pipe(
            map(messageData => {
              this.toast.openSnack('Messages updated', false);
              return ConversationActions.setGroupMessages({
                dialog: {
                  groupId: data.dialog.userId,
                  messageList: messageData.Items,
                },
              });
            }),
            catchError((err: HttpErrorResponse) => {
              this.errorService.showError(err);
              return EMPTY;
            })
          );
      })
    );
  });

  removePersonalConversation = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.removeDialog),
      exhaustMap(data => {
        return this.request.deleteConversation(data.userId).pipe(
          map(() => {
            this.toast.openSnack('Conversation has been deleted', false);
            this.modal.closeAll();
            this.router.navigate(['/']);
            return ConversationActions.delistConversation({
              userId: data.userId,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const { error } = err;
            if (error.type === 'error') {
              this.toast.openSnack(err.message, true);
            } else {
              if (error.message.includes('was not')) {
                this.clear.clearUserStorage();
              }
              this.toast.openSnack(error.message, true);
            }
            return EMPTY;
          })
        );
      })
    );
  });
}
