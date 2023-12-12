import { createAction, props } from '@ngrx/store';
import { UserRegisterData } from '../models';

export const init = createAction('[Init] init app');

export const invalidRegister = createAction(
  '[Register Page] User Register',
  props<{ email: string }>()
);

export const updateInvalidEmails = createAction(
  '[Register Page] Update invalid emails',
  props<{ emails: string[] }>()
);

export const installTheme = createAction(
  '[Register Page] InstalAppTheme',
  props<{ theme: string }>()
);

export const updateUserLoginData = createAction(
  '[Login Page] Update Used login data',
  props<{ data: UserRegisterData }>()
);
