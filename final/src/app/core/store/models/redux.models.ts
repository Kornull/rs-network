import { ErrorTypes } from './types';

type EmailExist = { [ErrorTypes.USER_EXIST]: string[] };

export interface UserState {
  'theme-app': string;
  invalidEmails: EmailExist;
}
