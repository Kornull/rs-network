import { createReducer, on } from '@ngrx/store';
import { VideosType } from '../models/store-card-details.model';
import { CardVideoActions, setAllVideos } from './video.actions';

const initialState: VideosType = {
  youtubeCardList: [],
  favoriteCards: [],
  customCards: [],
  allCards: [],
};

export const videoReducer = createReducer(
  initialState,
  on(CardVideoActions.addYoutubeCards, (state, actions): VideosType => {
    return { ...state, youtubeCardList: [...actions.youtubeCards] };
  }),
  on(CardVideoActions.addCustomCard, (state, actions): VideosType => {
    return {
      ...state,
      customCards: [...state.customCards, actions.customCard],
    };
  }),
  on(CardVideoActions.addFavoriteCard, (state, actions): VideosType => {
    return {
      ...state,
      favoriteCards: [...state.favoriteCards, actions.favoriteCard],
    };
  }),
  on(CardVideoActions.setStorageCards, (state, actions): VideosType => {
    return {
      ...state,
      allCards: [...actions.allCards],
    };
  }),
  on(setAllVideos, (state): VideosType => {
    return {
      ...state,
      allCards: [...state.favoriteCards, ...state.youtubeCardList],
    };
  })
);
