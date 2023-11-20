import { createReducer, on } from '@ngrx/store';
import { VideosType } from '../models/store-card-details.model';
import { CardVideoActions } from './video.actions';

const initialState: VideosType = {
  youtubeCardList: [],
  favoriteCards: [],
  customCards: [],
};

export const videoReducer = createReducer(
  initialState,
  on(CardVideoActions.addYoutubeCards, (state, actions): VideosType => {
    return { ...state, youtubeCardList: [...actions.youtubeCards] };
  }),
  on(CardVideoActions.addCustomCard, (state, actions): VideosType => {
    console.log(state.customCards);
    console.log(actions.customCard);
    return {
      ...state,
      customCards: [actions.customCard, ...state.customCards],
    };
  })
);
