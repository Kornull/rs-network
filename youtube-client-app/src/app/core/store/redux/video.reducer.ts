import { createReducer, on } from '@ngrx/store';
import {
  StateVideoCardsType,
  VideosType,
} from '../models/store-card-details.model';
import { CardVideoActions, CardsVideoActions } from './video.actions';

const initialState: VideosType = {
  selectedCardId: '',
  youtubeCardList: [],
  customCards: [],
};

const InitialState: StateVideoCardsType = {
  openedCard: '',
  cards: {},
  youtubeCardIds: [],
  likedCardIds: [],
  customCardIds: [],
};

export const videoReducer = createReducer(
  initialState,
  on(CardVideoActions.addYoutubeCards, (state, actions): VideosType => {
    return { ...state, youtubeCardList: [...actions.youtubeCards] };
  }),
  on(CardVideoActions.addCustomCard, (state, actions): VideosType => {
    return {
      ...state,
      customCards: [actions.customCard, ...state.customCards],
    };
  }),
  on(CardVideoActions.setCardId, (state, actions): VideosType => {
    return {
      ...state,
      selectedCardId: actions.cardId,
    };
  })
);

export const newVideoCardsReducer = createReducer(
  InitialState,
  on(CardsVideoActions.addYoutubeCard, (state, action): StateVideoCardsType => {
    return {
      ...state,
      cards: {
        ...state.cards,
        [action.youtubeCard.key]: action.youtubeCard,
      },
    };
  }),
  on(CardsVideoActions.addCustomCard, (state, action): StateVideoCardsType => {
    return {
      ...state,
      customCardIds: [...state.customCardIds, action.customCard.key],
      cards: {
        ...state.cards,
        [action.customCard.key]: action.customCard,
      },
    };
  }),
  on(
    CardsVideoActions.addYoutubeIdList,
    (state, action): StateVideoCardsType => {
      return {
        ...state,
        youtubeCardIds: [...action.cardIds],
      };
    }
  ),
  on(CardsVideoActions.setCardId, (state, action): StateVideoCardsType => {
    return {
      ...state,
      openedCard: action.cardId,
    };
  }),
  on(
    CardsVideoActions.addYoutubeCardsMok,
    (state, action): StateVideoCardsType => {
      return {
        ...state,
        cards: action.youtubeCardsMok,
      };
    }
  ),
  on(CardsVideoActions.likedCard, (state, action): StateVideoCardsType => {
    console.log(state);
    return {
      ...state,
      cards: {
        ...state.cards,
        [action.likedCardId]: {
          ...state.cards[action.likedCardId],
          liked: !state.cards[action.likedCardId].liked,
        },
      },
    };
  }),
  on(CardsVideoActions.addLikeCard, (state, action): StateVideoCardsType => {
    console.log(state);
    return {
      ...state,
      likedCardIds: [...state.likedCardIds, action.likeId],
    };
  })
);
