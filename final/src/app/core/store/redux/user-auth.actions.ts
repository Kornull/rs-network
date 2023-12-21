import { createAction, props } from '@ngrx/store';

export const init = createAction('[Init] init app');

export const invalidRegister = createAction(
  '[Register Page] User Register',
  props<{ email: string }>()
);

export const updateInvalidEmails = createAction(
  '[Register Page] Update invalid emails',
  props<{ emails: string[] }>()
);

export const updateUserLogged = createAction(
  '[Login Page] Update User isLogin',
  props<{ isLogged: boolean }>()
);

export const checkUserLogin = createAction('[Login Page] Check user Login');
