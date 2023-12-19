import { ErrorTypes } from './types';

type EmailExist = { [ErrorTypes.USER_EXIST]: string[] };

type DataResponseType = 'S';

type UserProfileData = 'createdAt' | 'email' | 'name' | 'uid';

export type ProfileInfoType = {
  [T in UserProfileData]: string;
};

export type DialogData = Record<string, GroupMessage[]>;

export interface UserState {
  'user-logged': boolean;
  profile: ProfileInfoType | null;
  invalidEmails: EmailExist;
  isGroupsReceived: boolean;
  groups: GroupsData;
  users: UsersData;
  conversations: UsersConversationData;
  dialogs: DialogData;
}
export interface UserListPersonalData {
  name: { [T in DataResponseType]: string };
  uid: { [T in DataResponseType]: string };
}

export interface ConversationDataList {
  id: { [T in DataResponseType]: string };
  companionID: { [T in DataResponseType]: string };
}

export type GetProfileInfoType = {
  [T in UserProfileData]: { [S in DataResponseType]: string };
};
export interface GroupInfo {
  createdAt: { [T in DataResponseType]: string };
  createdBy: { [T in DataResponseType]: string };
  name: { [T in DataResponseType]: string };
  id: { [T in DataResponseType]: string };
}

export interface DefaultData {
  Count: number;
  ScannedCount: number;
}
export interface GroupsData extends DefaultData {
  Items: GroupInfo[];
}

export interface UsersData extends DefaultData {
  Items: UserListPersonalData[];
}

export interface UsersConversationData extends DefaultData {
  Items: ConversationDataList[];
}

export type GetAllUserInfoType = {
  count: number;
  users: UserListPersonalData[];
  conversation: ConversationDataList[];
};

export interface UserDataAddConversation extends UserListPersonalData {
  isConversation?: boolean;
}

export interface UserDataInfo {
  count: number;
  users: UserDataAddConversation[];
}

export interface GroupMessage {
  authorID: { [T in DataResponseType]: string };
  createdAt: { [T in DataResponseType]: string };
  message: { [T in DataResponseType]: string };
}

export interface GroupMessages extends DefaultData {
  Items: GroupMessage[];
}
