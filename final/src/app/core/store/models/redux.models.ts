import { ErrorTypes } from './types';

type EmailExist = { [ErrorTypes.USER_EXIST]: string[] };

type DataResponseType = 'S';

type UserProfileData = 'createdAt' | 'email' | 'name' | 'uid';

export type ProfileInfoType = {
  [T in UserProfileData]: string;
};

export interface UserState {
  'user-logged': boolean;
  profile: ProfileInfoType | null;
  invalidEmails: EmailExist;
  isGroupsReceived: boolean;
  groups: GroupsData;
}
export interface UserList {
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
  Items: UserList[];
}

export interface UsersConversationData extends DefaultData {
  Items: ConversationDataList[];
}
