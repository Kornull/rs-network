import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { ConversationActions } from './action-types';
import { RequestsService, SnackBarService } from '../../services';

@Injectable()
export class ConversationEffects {
  constructor(
    private actions$: Actions,
    private toast: SnackBarService,
    private request: RequestsService,
    public modal: MatDialog
  ) {}

  sendMessage = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.sendGroupMessage),
      exhaustMap(data => {
        return this.request
          .sendMessageToGroup(data.dialog.message, data.dialog.groupId)
          .pipe(
            map(() => {
              this.toast.openSnack('Message sent', false);
              return ConversationActions.addOwnMessageToLocalGroupData({
                dialog: {
                  message: data.dialog.message,
                  createAt: data.dialog.createAt,
                  userId: data.dialog.userId,
                  groupId: data.dialog.groupId,
                },
              });
            }),
            catchError(err => {
              const { error } = err;
              if (error === null) {
                this.toast.openSnack(err.statusText, true);
              } else {
                this.toast.openSnack(error.message, true);
              }
              return EMPTY;
            })
          );
      })
    );
  });

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
            catchError(err => {
              const { error } = err;
              if (error === null) {
                this.toast.openSnack(err.statusText, true);
              } else {
                this.toast.openSnack(error.message, true);
              }
              return EMPTY;
            })
          );
      })
    );
  });
}
