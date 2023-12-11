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

export const installTheme = createAction(
  '[Register Page] InstalAppTheme',
  props<{ theme: string }>()
);
