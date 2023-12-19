import { createSelector } from '@ngrx/store';
import { selectAuthState } from './user.selectors';
import { InfoGroupMessagesType, UserListPersonalData } from '../models';

export const selectGroupMessages = (props: { groupId: string }) =>
  createSelector(selectAuthState, (state): InfoGroupMessagesType => {
    return {
      messages: state.dialogs[props.groupId],
      users: state.users.Items,
    };
  });

export const selectGetUsers = createSelector(
  selectAuthState,
  (state): UserListPersonalData[] => {
    return state.users.Items;
  }
);
