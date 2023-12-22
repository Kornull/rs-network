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
  CREATE_CONVERSATION = '/conversations/create',
  SEND_CONVERSATION_MSG = '/conversations/append',
  GET_CONVERSATION_MSG = '/conversations/read?conversationID=',
  DEL_CONVERSATION = '/conversations/delete?conversationID=',
  CREATE_GROUP = '/groups/create',
  DELETE_GROUP = '/groups/delete?groupID=',
  SEND_MESSAGE = '/groups/append',
  GET_MESSAGE = '/groups/read?groupID=',
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

export type GroupMessagesDataType = {
  name: string;
  time: string;
  message: string;
  id: string;
};

export type ConversationId = { conversationID: 'string' };

export enum DialogPageKey {
  PERSONAL = 'personal',
  GROUP = 'group',
}
