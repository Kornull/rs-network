import { Statistics } from './search-item.model';

export type CardInfoType = Record<string, CardDataType>;

type CardDetailsType = {
  title: string;
  subTitle: string;
  imageLink: string;
  videoLink: string;
  date: string;
  description: string;
  tags: string[];
  statistics: Statistics | null;
};

export type CardDataType = {
  key: string;
  value: CardDetailsType;
  liked: boolean | null;
  deleteBtn: boolean;
};

export type StateVideoCardsType = {
  countPages: number;
  pageNow: number;
  cards: CardInfoType;
  customCardIds: string[];
  youtubeCardIds: string[];
  favoriteCardIds: string[];
};
