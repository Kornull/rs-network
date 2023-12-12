import { ErrorTypes, UserRegisterData } from './types';

type EmailExist = { [ErrorTypes.USER_EXIST]: string[] };

export interface UserState {
  'user-logged-data': UserRegisterData;
  'user-logged': boolean;
  'theme-app': string;
  invalidEmails: EmailExist;
  // 'user-reg-data': UserRegisterData;
}
