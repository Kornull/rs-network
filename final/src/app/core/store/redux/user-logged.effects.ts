import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map, take } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatDialog } from '@angular/material/dialog';
import { LoggedActions } from './action-types';
import {
  LocalStorageService,
  RequestsService,
  SnackBarService,
} from '../../services';
import { UserRegisterData } from '../models';

@Injectable()
export class UserLoggedEffects {
  constructor(
    private actions$: Actions,
    private toast: SnackBarService,
    private store: Store,
    private request: RequestsService,
    private localStore: LocalStorageService,
    public modal: MatDialog
  ) {}

  checkProfileInfo = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoggedActions.getUserInfo, LoggedActions.setUserInfo),
      exhaustMap(() =>
        this.request.getUserInfo().pipe(
          map(data => {
            return LoggedActions.setUserInfo({
              data: {
                email: data.email.S,
                name: data.name.S,
                uid: data.uid.S,
                createdAt: data.createdAt.S,
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
        )
      )
    );
  });

  updateGroups = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoggedActions.getGroupsList),
      exhaustMap(() => {
        return this.request.getUsersGroups().pipe(
          map(groups => {
            this.toast.openSnack('Groups updated', false);
            return LoggedActions.setGroupsList({
              groupsData: {
                Count: groups.Count,
                Items: groups.Items,
                ScannedCount: groups.ScannedCount,
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

  createOwnDialogGroup = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoggedActions.setOwnGroup),
      exhaustMap(data => {
        return this.request.createGroup(data.titleGroup).pipe(
          map(groupId => {
            const loginInfo: UserRegisterData | null =
              this.localStore.getLoginInfo();

            this.toast.openSnack('Group was created', false);
            this.modal.closeAll();
            console.log({
              createdAt: { S: `${Date.now()}` },
              createdBy: { S: `${loginInfo?.uid}` },
              name: { S: data.titleGroup },
              id: { S: groupId.groupID },
            });
            return LoggedActions.addOwnGroup({
              group: {
                createdAt: { S: `${Date.now()}` },
                createdBy: { S: `${loginInfo?.uid}` },
                name: { S: data.titleGroup },
                id: { S: groupId.groupID },
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

  removeOwnDialogGroup = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoggedActions.removeOwnGroup),
      exhaustMap(data => {
        return this.request.deleteOwnGroup(data.groupId).pipe(
          map(() => {
            this.toast.openSnack('Group has been deleted', false);
            this.modal.closeAll();
            return LoggedActions.delistOwnGroup({
              groupId: data.groupId,
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
      }),
      take(1)
    );
  });
}
