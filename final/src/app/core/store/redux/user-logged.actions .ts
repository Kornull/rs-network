import { createAction, props } from '@ngrx/store';
import { ProfileInfoType } from '../models';

export const getUserInfo = createAction('[Profile Page]  Get profile info');

export const changeProfileName = createAction(
  '[Profile Page]  Update user name.',
  props<{ name: string }>()
);

export const setUserInfo = createAction(
  '[Profile Page] Update profile info',
  props<{ data: ProfileInfoType }>()
);

export const UserInfoError = createAction(
  '[Profile Page] Update profile info',
  props<{ data: ProfileInfoType }>()
);
