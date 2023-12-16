import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  GroupsData,
  ProfileInfoType,
  UserDataInfo,
  UserState,
} from '../models';

export const selectAuthState = createFeatureSelector<UserState>('user');

export const selectGetErrorEmails = createSelector(
  selectAuthState,
  (state): string[] => {
    return state.invalidEmails.PrimaryDuplicationException;
  }
);

export const selectIsUserLogged = createSelector(
  selectAuthState,
  (state): boolean => {
    return state['user-logged'];
  }
);

export const selectCheckProfileInfo = createSelector(
  selectAuthState,
  (state): ProfileInfoType | null => {
    return state.profile;
  }
);

export const selectGroupsInfo = createSelector(
  selectAuthState,
  (state): GroupsData => {
    return state.groups;
  }
);

export const selectAllUsersInfo = createSelector(
  selectAuthState,
  (state): UserDataInfo => {
    const conversationList = state.conversations.Items.map(
      item => item.companionID.S
    );

    return {
      count: state.users.Count,
      users: state.users.Items.map(user => {
        return conversationList.includes(user.uid.S)
          ? {
              ...user,
              isConversation: true,
            }
          : user;
      }),
    };
  }
);
