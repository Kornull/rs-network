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

  removePersonalConversation = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.removeDialog),
      exhaustMap(data => {
        return this.request.deleteConversation(data.userId).pipe(
          map(() => {
            this.toast.openSnack('Conversation has been deleted', false);
            this.modal.closeAll();
            return ConversationActions.delistConversation({
              userId: data.userId,
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
