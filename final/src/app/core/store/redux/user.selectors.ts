import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileInfoType, UserState } from '../models';

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