import { ErrorTypes, ProfileInfoType } from './types';

type EmailExist = { [ErrorTypes.USER_EXIST]: string[] };

export interface UserState {
  'user-logged': boolean;
  profile: ProfileInfoType | null;
  invalidEmails: EmailExist;
}

export interface CreatedAt {
  S: string;
}

export interface Email {
  S: string;
}

export interface Name {
  S: string;
}

export interface Uid {
  S: string;
}

export interface GroupId {
  S: string;
}

export interface GroupCreatedBy {
  S: string;
}

export interface GetProfileInfoType {
  createdAt: CreatedAt;
  email: Email;
  name: Name;
  uid: Uid;
}
export interface GroupInfo {
  createdAt: CreatedAt;
  createdBy: GroupCreatedBy;
  name: Name;
  id: GroupId;
}

export interface GroupsData {
  Count: number;
  Items: GroupInfo[];
  ScannedCount: number;
}
