import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateVideoCardsType } from '../models/store-card-details.model';
import { CountCardsOnPage } from '../models/types';

export const selectCards =
  createFeatureSelector<StateVideoCardsType>('videoCards');

export const selectGetCardsOnPage = createSelector(selectCards, state => {
  return [...state.customCardIds, ...state.youtubeCardIds]
    .slice(
      (state.pageNow - 1) * CountCardsOnPage.COUNT_CARDS,
      state.pageNow * CountCardsOnPage.COUNT_CARDS
    )
    .map(id => state.cards[id]);
});

export const selectGetOpenedCardId = createSelector(selectCards, state => {
  return state.cards[state.openedCard];
});

export const selectGetFavoriteCardsForLocalStore = createSelector(
  selectCards,
  state => {
    const cards = state.favoriteCardIds.map(id => ({ [id]: state.cards[id] }));
    let obj = {};
    cards.forEach(card => {
      obj = {
        ...obj,
        ...card,
      };
    });
    return obj;
  }
);

export const selectGetLikedCards = createSelector(selectCards, state => {
  return state.favoriteCardIds.map(id => state.cards[id]);
});

export const selectGetAllIdsCount = createSelector(selectCards, state => {
  return [...state.customCardIds, ...state.youtubeCardIds].length;
});

export const selectGetCountPages = createSelector(selectCards, state => {
  return state.countPages;
});

export const selectGetPageNow = createSelector(selectCards, state => {
  return state.pageNow;
});
