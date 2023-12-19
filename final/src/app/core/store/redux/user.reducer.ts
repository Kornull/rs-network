import { createReducer, on } from '@ngrx/store';

import {
  AuthActions,
  ConversationActions,
  LoggedActions,
} from './action-types';

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
  dialogs: {
    uvye21qx42: [
      {
        authorID: { S: 'q90jcm0mm7j' },
        createdAt: { S: '1702911051420' },
        message: { S: 'hrhhrhrh' },
      },
      {
        authorID: { S: 'q90jcm0mm7j' },
        createdAt: { S: '1702911058525' },
        message: { S: 'Urrrrrh' },
      },
      {
        authorID: { S: 'q90jcm0mm7j' },
        createdAt: { S: '1702911062495' },
        message: { S: 'Urrrddddddddddddddddddsdrrh' },
      },
      {
        authorID: { S: 'q90jcm0mm7j' },
        createdAt: { S: '1702911086437' },
        message: { S: 'ASd' },
      },
      {
        authorID: { S: 'q90jcm0mm7j' },
        createdAt: { S: '1702911501760' },
        message: { S: 'ASSSSSSSSSSSd' },
      },
      {
        authorID: { S: 'q90jcm0mm7j' },
        createdAt: { S: '1702911516950' },
        message: { S: 'ABEERRRRSSSSd' },
      },
      {
        authorID: { S: 'q90jcm0mm7j' },
        createdAt: { S: '1702916489289' },
        message: { S: 'A1RRSSSSd' },
      },
      {
        authorID: { S: 'om6ashyyhi' },
        createdAt: { S: '1702916475688' },
        message: { S: 'DSDSd' },
      },
      {
        authorID: { S: 'om6ashyyhi' },
        createdAt: { S: '1702916508096' },
        message: { S: 'DSssssDSd' },
      },
      {
        authorID: { S: 'r1a83i0y7w' },
        createdAt: { S: '1702910879953' },
        message: { S: 'saGGAAAAG' },
      },
      {
        authorID: { S: 'r1a83i0y7w' },
        createdAt: { S: '1702911076524' },
        message: { S: 'sSege' },
      },
      {
        authorID: { S: 'r1a83i0y7w' },
        createdAt: { S: '1702911098765' },
        message: { S: 'BUPTERge' },
      },
      {
        authorID: { S: 'r1a83i0y7w' },
        createdAt: { S: '1702911505652' },
        message: { S: 'BUPTsssERge' },
      },
      {
        authorID: { S: 'r1a83i0y7w' },
        createdAt: { S: '1702916502577' },
        message: { S: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww' },
      },
    ],
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
  on(ConversationActions.setGroupMessages, (state, actions): UserState => {
    return {
      ...state,
      dialogs: {
        ...state.dialogs,
        [actions.dialog.groupId]: state.dialogs[actions.dialog.groupId]
          ? [
              ...state.dialogs[actions.dialog.groupId],
              ...actions.dialog.messageList,
            ]
          : [...actions.dialog.messageList],
      },
    };
  }),
  on(LoggedActions.isUserNotFound, (): UserState => {
    return {
      ...initialState,
    };
  })
);
