import { createAction, props } from '@ngrx/store';
import { GroupsData, ProfileInfoType } from '../models';

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
  '[Main Page] Update groups info',
  props<{ groupsData: GroupsData }>()
);
