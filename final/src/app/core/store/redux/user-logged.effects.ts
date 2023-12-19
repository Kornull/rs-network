import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { LoggedActions } from './action-types';
import { ProfileDataService } from '../../services/profile-data/profile-data.service';
import { SnackBarService } from '../../services';

@Injectable()
export class UserLoggedEffects {
  constructor(
    private actions$: Actions,
    private toast: SnackBarService,
    private store: Store,
    private getProfileData: ProfileDataService
  ) {}

  checkProfileInfo = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoggedActions.getUserInfo, LoggedActions.setUserInfo),
      exhaustMap(() =>
        this.getProfileData.getUserInfo().pipe(
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
}
