import { createReducer, on } from '@ngrx/store';

import { AuthActions } from './action-types';

import { ErrorTypes, UserState } from '../models';

export const initialState: UserState = {
  'theme-app': '',
  'user-logged': {
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
  })
);
