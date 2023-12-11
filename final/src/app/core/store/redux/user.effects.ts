import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, of, tap } from 'rxjs';

import { init } from './user-auth.actions';
import { selectGetErrorEmails } from './user.selectors';
import { AuthActions } from './action-types';

import { LocalStoreKeys } from '../models';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store
  ) {}

  saveInvalidEmails = createEffect(() => {
    return this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const invalidEmails: string | null =
          localStorage.getItem(LocalStoreKeys.INVALID_EMAIL) || null;
        if (invalidEmails !== null) {
          return of(
            AuthActions.updateInvalidEmails({
              emails: JSON.parse(invalidEmails),
            })
          );
        }
        return of(
          AuthActions.updateInvalidEmails({
            emails: [],
          })
        );
      })
    );
  });

  updateInvalidEmailsToLocalStore = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.invalidRegister),
        concatLatestFrom(() => this.store.select(selectGetErrorEmails)),
        tap(([, errorEmailList]) => {
          localStorage.setItem(
            LocalStoreKeys.INVALID_EMAIL,
            JSON.stringify(errorEmailList)
          );
        })
      );
    },
    { dispatch: false }
  );
}
