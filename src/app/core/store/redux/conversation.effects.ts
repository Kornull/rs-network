import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { ConversationActions } from './action-types';

import SnackBarService from '../../services/snack-bar/snack-bar.service';
import RequestsService from '../../services/requests/requests.service';
import ErrorService from '../../services/error/error.service';

@Injectable()
export class ConversationEffects {
  constructor(
    private actions$: Actions,
    private toast: SnackBarService,
    private request: RequestsService,
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
              return ConversationActions.setUsersMessages({
                dialog: {
                  userId: data.dialog.userId,
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
}
