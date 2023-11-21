export enum FilterCommand {
  UP = 'up',
  DOWN = 'down',
}

export enum DefaultDataCustomBtn {
  DEFAULT = 'default',
  SEARCH = 'search',
  FILTER = 'filter',
  SETTINGS = 'settings',
  USER = 'user',
  GO_BACK = 'goBack',
}

export type UserData = {
  email: string;
  password: string;
};

export enum SortingTitle {
  DATE = 'date',
  FILTER = 'filter',
  VIEW = 'view',
}

export enum CountCardsOnPage {
  COUNT_CARDS = 20,
}
