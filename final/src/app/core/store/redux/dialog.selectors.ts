import { createSelector } from '@ngrx/store';
import { selectAuthState } from './user.selectors';
import {
  ConversationDataList,
  InfoGroupMessagesType,
  UserListPersonalData,
} from '../models';

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

export const selectGetConversations = createSelector(
  selectAuthState,
  (state): ConversationDataList[] => {
    return state.conversations.Items;
  }
);

export const selectGetPersonalConversations = (props: { userId: string }) =>
  createSelector(selectAuthState, (state): InfoGroupMessagesType => {
    return {
      messages: state.dialogs[props.userId],
      users: state.users.Items,
    };
  });
