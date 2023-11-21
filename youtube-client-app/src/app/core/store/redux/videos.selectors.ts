import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateVideoCardsType } from '../models/store-card-details.model';

export const selectCards =
  createFeatureSelector<StateVideoCardsType>('videoCards');

export const selectGetCards = createSelector(selectCards, state => {
  return [...state.customCardIds, ...state.youtubeCardIds].map(
    (id: string) => state.cards[id]
  );
});

export const selectGetOpenedCard = createSelector(selectCards, state => {
  return state.cards[state.openedCard];
});

export const selectGetCustomCards = createSelector(selectCards, state => {
  const cards = state.customCardIds.map(id => ({ [id]: state.cards[id] }));
  let obj = {};
  cards.forEach(card => {
    obj = {
      ...obj,
      ...card,
    };
  });
  return obj;
});

export const selectGetLikedCards = createSelector(selectCards, state => {
  return state.likedCardIds.map(id => state.cards[id]);
});
