import { createReducer, on } from '@ngrx/store';
import { StateVideoCardsType } from '../models/store-card-details.model';
import { cardsVideoActions } from './video.actions';

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
  on(cardsVideoActions.addYoutubeCard, (state, action): StateVideoCardsType => {
    return {
      ...state,
      cards: {
        ...state.cards,
        [action.youtubeCard.key]: action.youtubeCard,
      },
      youtubeCardIds: [...state.youtubeCardIds, action.youtubeCard.key],
    };
  }),
  on(cardsVideoActions.addCustomCard, (state, action): StateVideoCardsType => {
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
    cardsVideoActions.addFavoriteIdList,
    (state, action): StateVideoCardsType => {
      return {
        ...state,
        favoriteCardIds: [...action.favoriteIds],
      };
    }
  ),
  on(
    cardsVideoActions.addFavoriteCardsFromLocalStore,
    (state, action): StateVideoCardsType => {
      return {
        ...state,
        cards: action.favoriteCards,
      };
    }
  ),
  on(
    cardsVideoActions.removeCustomCard,
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
    cardsVideoActions.addFavoriteCard,
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
  on(cardsVideoActions.addCountPages, (state, action): StateVideoCardsType => {
    return {
      ...state,
      countPages: Math.ceil(action.idsLength),
    };
  }),
  on(
    cardsVideoActions.updateCurrentPage,
    (state, action): StateVideoCardsType => {
      return {
        ...state,
        pageNow: action.pageNow,
      };
    }
  ),
  on(cardsVideoActions.clearYoutubeIdList, (state): StateVideoCardsType => {
    return {
      ...state,
      youtubeCardIds: [],
    };
  }),
  on(cardsVideoActions.clearStore, (): StateVideoCardsType => {
    return InitialState;
  })
);
