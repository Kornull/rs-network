import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateVideoCardsType } from '../models/store-card-details.model';
import { CountCardsOnPage } from '../models/types';

export const selectCards =
  createFeatureSelector<StateVideoCardsType>('Video cards');

export const selectGetCardsOnPage = createSelector(selectCards, state => {
  return [...state.customCardIds, ...state.youtubeCardIds]
    .slice(
      (state.pageNow - 1) * CountCardsOnPage.COUNT_CARDS,
      state.pageNow * CountCardsOnPage.COUNT_CARDS
    )
    .map(id => state.cards[id]);
});

export const selectGetOpenedCard = (props: { id: string }) =>
  createSelector(selectCards, state => {
    return state.cards[props.id];
  });

export const selectGetFavoriteCardsFromLocalStore = createSelector(
  selectCards,
  state =>
    Object.assign(
      {},
      ...state.favoriteCardIds.map(id => ({ [id]: state.cards[id] }))
    )
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
