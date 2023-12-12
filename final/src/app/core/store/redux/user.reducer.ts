import { createReducer, on } from '@ngrx/store';

import { AuthActions } from './action-types';

import { ErrorTypes, UserState } from '../models';

export const initialState: UserState = {
  'theme-app': '',
  'user-logged': false,
  'user-logged-data': {
    email: '',
    uid: '',
    token: '',
  },
  invalidEmails: {
    [ErrorTypes.USER_EXIST]: [],
  },
};

export const UserReducer = createReducer(
  initialState,

  on(AuthActions.invalidRegister, (state, actions): UserState => {
    return {
      ...state,
      invalidEmails: {
        PrimaryDuplicationException: [
          ...new Set([
            ...state.invalidEmails.PrimaryDuplicationException,
            actions.email,
          ]),
        ],
      },
    };
  }),
  on(AuthActions.updateInvalidEmails, (state, actions): UserState => {
    return {
      ...state,
      invalidEmails: {
        PrimaryDuplicationException: [...actions.emails],
      },
    };
  }),
  on(AuthActions.installTheme, (state, actions): UserState => {
    return {
      ...state,
      'theme-app': actions.theme,
    };
  }),
  on(AuthActions.updateUserLogged, (state, actions): UserState => {
    return {
      ...state,
      'user-logged': actions.isLogged,
    };
  })
);
