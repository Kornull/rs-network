import { createAction, props } from '@ngrx/store';
import { GroupMessageData } from '../models';

export const setGroupMessages = createAction(
  '[Group dialog] Update group messages',
  props<{
    dialog: {
      groupId: string;
      messageList: GroupMessageData[];
    };
  }>()
);

export const getGroupMessages = createAction(
  '[Group dialog] Get group messages',
  props<{
    dialog: {
      groupId: string;
      since?: string;
    };
  }>()
);

export const sendGroupMessage = createAction(
  '[Group dialog] Send own messages',
  props<{
    dialog: {
      groupId: string;
      message: string;
      userId: string;
      createAt: string;
    };
  }>()
);

export const addOwnMessageToLocalGroupData = createAction(
  '[Group dialog] Update own messages',
  props<{
    dialog: {
      message: string;
      userId: string;
      createAt: string;
      groupId: string;
    };
  }>()
);

export const updateDialogUsers = createAction(
  '[Group dialog] Update dialog users'
);

export const setUsersMessages = createAction(
  '[Personal dialog] Update personal messages',
  props<{
    dialog: {
      userId: string;
      messageList: GroupMessageData[];
    };
  }>()
);

export const getUserMessages = createAction(
  '[Personal dialog] Get personal messages',
  props<{
    dialog: {
      userId: string;
      since?: string;
    };
  }>()
);

export const removeDialog = createAction(
  '[Personal dialog] Remove conversation',
  props<{ userId: string }>()
);

export const delistConversation = createAction(
  '[Main Page: Groups] Delist conversation',
  props<{ userId: string }>()
);
