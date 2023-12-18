import { createReducer, on } from '@ngrx/store';

import { AuthActions, LoggedActions } from './action-types';

import { ErrorTypes, UserState } from '../models';

export const initialState: UserState = {
  'user-logged': false,
  profile: null,
  isGroupsReceived: false,
  groups: {
    Count: 0,
    Items: [],
    ScannedCount: 0,
  },
  users: {
    Count: 0,
    Items: [],
    ScannedCount: 0,
  },
  conversations: {
    Count: 0,
    Items: [],
    ScannedCount: 0,
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
  on(AuthActions.updateUserLogged, (state, actions): UserState => {
    return {
      ...state,
      'user-logged': actions.isLogged,
    };
  }),
  on(LoggedActions.setUserInfo, (state, actions): UserState => {
    return {
      ...state,
      profile: { ...actions.data },
    };
  }),
  on(LoggedActions.changeProfileName, (state, actions): UserState => {
    return {
      ...state,
      profile:
        state.profile !== null
          ? {
              ...state.profile,
              name: actions.name,
            }
          : null,
    };
  }),
  on(LoggedActions.setGroupsList, (state, actions): UserState => {
    return {
      ...state,
      groups: {
        ...actions.groupsData,
      },
    };
  }),
  on(LoggedActions.addOwnGroup, (state, actions): UserState => {
    return {
      ...state,
      groups: {
        ...state.groups,
        Count: state.groups.Count + 1,
        Items: [actions.group, ...state.groups.Items],
      },
    };
  }),
  on(LoggedActions.delistOwnGroup, (state, actions): UserState => {
    return {
      ...state,
      groups: {
        ...state.groups,
        Count: state.groups.Count - 1,
        Items: [
          ...state.groups.Items.filter(group => group.id.S !== actions.groupId),
        ],
      },
    };
  }),
  on(LoggedActions.setUserAllLists, (state, actions): UserState => {
    return {
      ...state,
      users: {
        ...actions.users,
      },
      conversations: {
        ...actions.conversation,
      },
    };
  }),
  on(LoggedActions.isUserNotFound, (): UserState => {
    return {
      ...initialState,
    };
  })
);
