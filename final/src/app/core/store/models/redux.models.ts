import { ErrorTypes, ProfileInfoType, UserRegisterData } from './types';

type EmailExist = { [ErrorTypes.USER_EXIST]: string[] };

export interface UserState {
  'user-logged-data': UserRegisterData;
  'user-logged': boolean;
  'theme-app': string;
  profile: ProfileInfoType | null;
  invalidEmails: EmailExist;
  // 'user-reg-data': UserRegisterData;
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

export interface GetProfileInfoType {
  createdAt: CreatedAt;
  email: Email;
  name: Name;
  uid: Uid;
}
