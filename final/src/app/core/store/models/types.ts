export type UserRegister = {
  name: string;
  email: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export enum RequestsData {
  URL = 'https://tasks.app.rs.school/angular',
  REGISTER = '/registration',
  LOGIN = '/login',
  LOGOUT = '/logout',
  PROFILE = '/profile',
  GROUP_LIST = '/groups/list',
  USER_LIST = '/users',
  USER_CONVERSATION = '/conversations/list',
  CREATE_GROUP = '/groups/create',
  DELETE_GROUP = '/groups/delete?groupID=',
}

export enum ErrorTypes {
  USER_EXIST = 'PrimaryDuplicationException',
  INVALID_REG_FORM = 'InvalidFormDataException',
  USER_ERROR_LOGIN = 'NotFoundException',
  INVALID_LOGIN_FORM = 'InvalidFormDataException"',
  TOKEN_ERROR = 'Current session token is not valid.',
}

export enum LocalStoreKeys {
  INVALID_EMAIL = 'invalid-emails',
  THEME = 'theme-app-now',
  AUTH_USER = 'auth-user-data',
}

export enum AppTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export type UserLoginSuccess = {
  token: string;
  uid: string;
};

export type UserRegisterData = UserLoginSuccess & {
  email: string;
};

export type ResponseCreateGroup = {
  groupID: string;
};
