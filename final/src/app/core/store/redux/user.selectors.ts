import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserRegisterData, UserState } from '../models';

export const selectAuthState = createFeatureSelector<UserState>('user');

export const selectGetErrorEmails = createSelector(
  selectAuthState,
  (state): string[] => {
    return state.invalidEmails.PrimaryDuplicationException;
  }
);

export const selectTheme = createSelector(selectAuthState, (state): string => {
  return state['theme-app'];
});

export const selectUserLogData = createSelector(
  selectAuthState,
  (state): UserRegisterData => {
    return state['user-logged-data'];
  }
);

export const selectIsUserLogged = createSelector(
  selectAuthState,
  (state): boolean => {
    return state['user-logged'];
  }
);
