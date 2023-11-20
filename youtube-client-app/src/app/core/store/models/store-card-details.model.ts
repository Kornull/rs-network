import { Statistics } from './search-item.model';

type VideoStoreTitles = 'youtubeCardList' | 'favoriteCards' | 'customCards';

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
  id: string;
  cardDetail: CardDetailsType;
  liked: boolean | null;
};

export type VideosType = {
  [T in VideoStoreTitles]: CardDataType[];
};
