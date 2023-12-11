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
}

export enum ErrorTypes {
  USER_EXIST = 'PrimaryDuplicationException',
  INVALID_REG_FORM = 'InvalidFormDataException',
  INVALID_LOGIN_FORM = 'NotFoundException',
}

export enum LocalStoreKeys {
  INVALID_EMAIL = 'invalid-emails',
  THEME = 'theme-app-now',
  AUTH_USER = 'auth-user-data',
}
