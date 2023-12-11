export type UserRegister = {
  name: string;
  email: string;
  password: string;
};

export enum RequestsData {
  URL = 'https://tasks.app.rs.school/angular',
  REGISTER = '/registration',
}

export enum ErrorTypes {
  USER_EXIST = 'PrimaryDuplicationException',
  INVALID_FORM = 'InvalidFormDataException',
}

export enum LocalStoreKeys {
  INVALID_EMAIL = 'invalid-emails',
  THEME = 'theme-app-now',
}
