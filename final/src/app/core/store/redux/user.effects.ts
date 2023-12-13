import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, of, tap } from 'rxjs';

import { init } from './user-auth.actions';
import { selectGetErrorEmails } from './user.selectors';
import { AuthActions } from './action-types';

import {
  LocalStorageService,
  RegisterService,
  SnackBarService,
} from '../../services';
import { UserRegisterData } from '../models';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private localStore: LocalStorageService,
    private toast: SnackBarService,
    private regProfile: RegisterService
  ) {}

  saveInvalidEmails = createEffect(() => {
    return this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const invalidEmails: string[] | null =
          this.localStore.getInvalidEmails();
        if (invalidEmails !== null) {
          return of(
            AuthActions.updateInvalidEmails({
              emails: invalidEmails,
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

  checkUserLog = createEffect(() => {
    return this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const invalidEmails: UserRegisterData | null =
          this.localStore.getLoginInfo();
        if (invalidEmails !== null) {
          return of(
            AuthActions.updateUserLogged({
              isLogged: true,
            })
          );
        }
        return of(
          AuthActions.updateUserLogged({
            isLogged: false,
          })
        );
      })
    );
  });

  installDefaultTheme = createEffect(() => {
    return this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const theme: string | null = this.localStore.getThemeApp();
        if (theme !== null) {
          return of(
            AuthActions.installTheme({
              theme,
            })
          );
        }
        this.localStore.setThemeApp('lightTheme');
        return of(
          AuthActions.installTheme({
            theme: 'lightTheme',
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
          this.localStore.setInvalidEmails(errorEmailList);
        })
      );
    },
    { dispatch: false }
  );
}
