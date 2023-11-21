import { createReducer, on } from '@ngrx/store';
import { StateVideoCardsType } from '../models/store-card-details.model';
import { CardsVideoActions } from './video.actions';

const InitialState: StateVideoCardsType = {
  openedCard: '',
  cards: {},
  youtubeCardIds: [],
  likedCardIds: [],
  customCardIds: [],
};

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
    CardsVideoActions.addCustomIdList,
    (state, action): StateVideoCardsType => {
      return {
        ...state,
        customCardIds: [...action.customCardIds],
      };
    }
  ),
  on(
    CardsVideoActions.addYoutubeIdList,
    (state, action): StateVideoCardsType => {
      return {
        ...state,
        youtubeCardIds: [...action.youtubeCardIds],
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
    CardsVideoActions.addCustomCardsFromLocalStore,
    (state, action): StateVideoCardsType => {
      return {
        ...state,
        cards: action.customCards,
      };
    }
  ),
  on(
    CardsVideoActions.removeCustomCard,
    (state, action): StateVideoCardsType => {
      return {
        ...state,
        customCardIds: [
          ...state.customCardIds.filter(id => id !== action.delCustomCardId),
        ],
      };
    }
  ),
  on(
    CardsVideoActions.addFavoriteCard,
    (state, action): StateVideoCardsType => {
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.likedCardId]: {
            ...state.cards[action.likedCardId],
            liked: !state.cards[action.likedCardId].liked,
          },
        },
        likedCardIds: state.likedCardIds.includes(action.likedCardId)
          ? state.likedCardIds.filter(id => id !== action.likedCardId)
          : [...state.likedCardIds, action.likedCardId],
      };
    }
  )
);
