import { createAction, props } from '@ngrx/store';
import {
  GroupInfo,
  GroupMessage,
  GroupsData,
  ProfileInfoType,
  UsersConversationData,
  UsersData,
} from '../models';

export const setGroupMessages = createAction(
  '[Group dialog] Update group messages',
  props<{
    dialog: {
      groupId: string;
      messageList: GroupMessage[];
    };
  }>()
);
