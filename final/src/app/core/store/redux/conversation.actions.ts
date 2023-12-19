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
