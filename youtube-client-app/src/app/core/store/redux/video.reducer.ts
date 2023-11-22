import { createReducer, on } from '@ngrx/store';
import { StateVideoCardsType } from '../models/store-card-details.model';
import { CardsVideoActions } from './video.actions';
import { CountCardsOnPage } from '../models/types';

const InitialState: StateVideoCardsType = {
  countPages: 0,
  pageNow: 1,
  cards: {},
  youtubeCardIds: [],
  favoriteCardIds: [],
  customCardIds: [],
};

export const VideoCardsReducer = createReducer(
  InitialState,
  on(CardsVideoActions.addYoutubeCard, (state, action): StateVideoCardsType => {
    return {
      ...state,
      cards: {
        ...state.cards,
        [action.youtubeCard.key]: action.youtubeCard,
      },
      youtubeCardIds: [...state.youtubeCardIds, action.youtubeCard.key],
    };
  }),
  on(CardsVideoActions.addCustomCard, (state, action): StateVideoCardsType => {
    return {
      ...state,
      customCardIds: [action.customCard.key, ...state.customCardIds],
      cards: {
        ...state.cards,
        [action.customCard.key]: action.customCard,
      },
    };
  }),
  on(
    CardsVideoActions.addFavoriteIdList,
    (state, action): StateVideoCardsType => {
      return {
        ...state,
        favoriteCardIds: [...action.favoriteIds],
      };
    }
  ),
  on(
    CardsVideoActions.addFavoriteCardsFromLocalStore,
    (state, action): StateVideoCardsType => {
      return {
        ...state,
        cards: action.favoriteCards,
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
        favoriteCardIds: state.favoriteCardIds.includes(action.likedCardId)
          ? state.favoriteCardIds.filter(id => id !== action.likedCardId)
          : [action.likedCardId, ...state.favoriteCardIds],
      };
    }
  ),
  on(CardsVideoActions.addCountPages, (state, action): StateVideoCardsType => {
    const countPages = action.idsLength / CountCardsOnPage.COUNT_CARDS;
    return {
      ...state,
      countPages: Math.ceil(countPages),
    };
  }),
  on(
    CardsVideoActions.updateCurrentPage,
    (state, action): StateVideoCardsType => {
      return {
        ...state,
        pageNow: action.pageNow,
      };
    }
  ),
  on(CardsVideoActions.clearYoutubeIdList, (state): StateVideoCardsType => {
    return {
      ...state,
      youtubeCardIds: [],
    };
  }),
  on(CardsVideoActions.clearStore, (): StateVideoCardsType => {
    return InitialState;
  })
);
