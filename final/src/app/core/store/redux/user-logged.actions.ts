import { createAction, props } from '@ngrx/store';
import {
  GroupInfo,
  GroupMessageData,
  GroupsData,
  ProfileInfoType,
  UsersConversationData,
  UsersData,
} from '../models';

export const getUserInfo = createAction('[Profile Page]  Get profile info');

export const getGroupsList = createAction('[Main Page]  Update groups');

export const changeProfileName = createAction(
  '[Profile Page]  Update user name.',
  props<{ name: string }>()
);

export const setUserInfo = createAction(
  '[Profile Page] Update profile info',
  props<{ data: ProfileInfoType }>()
);

export const setGroupsList = createAction(
  '[Main Page-Groups] Update groups info',
  props<{ groupsData: GroupsData }>()
);

export const setOwnGroup = createAction(
  '[Main Page: Groups] Create own group',
  props<{ titleGroup: string }>()
);

export const addOwnGroup = createAction(
  '[Main Page: Groups] Add own group to the list',
  props<{ group: GroupInfo }>()
);

export const removeOwnGroup = createAction(
  '[Main Page: Groups] Remove own group',
  props<{ groupId: string }>()
);

export const delistOwnGroup = createAction(
  '[Main Page: Groups] Delist the own group',
  props<{ groupId: string }>()
);

export const getUsers = createAction('[Main Page: Users] Get Users');

export const setUserAllLists = createAction(
  '[Main Page: Users] Update user list',
  props<{ users: UsersData; conversation: UsersConversationData }>()
);

export const isUserNotFound = createAction(
  '[Profile] If user not found - logout'
);

export const setGroupMessages = createAction(
  '[Group dialog] Update group messages',
  props<{ messages: GroupMessageData[] }>()
);
