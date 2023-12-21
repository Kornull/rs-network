import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, forkJoin, map } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { ConversationActions, LoggedActions } from './action-types';
import { UserRegisterData } from '../models';

import SnackBarService from '../../services/snack-bar/snack-bar.service';
import RequestsService from '../../services/requests/requests.service';
import LocalStorageService from '../../services/local-storage/local-storage.service';
import ClearStoreService from '../../services/clear-store/clear.service';

@Injectable()
export class UserLoggedEffects {
  constructor(
    private actions$: Actions,
    private toast: SnackBarService,
    private request: RequestsService,
    private localStore: LocalStorageService,
    private clear: ClearStoreService,
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
        )
      )
    );
  });

  updateGroups = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        LoggedActions.getGroupsList,
        ConversationActions.updateDialogUsers
      ),
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

  updateUsersAllLists = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoggedActions.getUsers, ConversationActions.updateDialogUsers),
      exhaustMap(() => {
        return forkJoin({
          users: this.request.getAllUsers(),
          dialogs: this.request.getAllUsersDialogs(),
        }).pipe(
          map(res => {
            this.toast.openSnack('Users list has been updated', false);
            return LoggedActions.setUserAllLists({
              users: res.users,
              conversation: res.dialogs,
            });
          }),
          catchError(err => {
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
