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
