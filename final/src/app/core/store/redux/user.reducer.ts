import { createReducer, on } from '@ngrx/store';

import { AuthActions } from './action-types';

import { ErrorTypes, UserState } from '../models';

export const initialState: UserState = {
  isRegisterError: true,
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
  })
);
