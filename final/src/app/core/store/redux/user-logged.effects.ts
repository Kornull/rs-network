import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';

import { LoggedActions } from './action-types';
import { ProfileDataService } from '../../services/profile-data/profile-data.service';
import { SnackBarService } from '../../services';

@Injectable()
export class UserLoggedEffects {
  constructor(
    private actions$: Actions,
    private toast: SnackBarService,
    private getProfileData: ProfileDataService
  ) {}

  checkProfileInfo = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoggedActions.getUserInfo),
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
            this.toast.openSnack(error.message, true);
            return EMPTY;
          })
        )
      )
    );
  });
}
