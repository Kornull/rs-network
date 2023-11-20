import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  StateVideoCardsType,
  VideosType,
} from '../models/store-card-details.model';

export const selectVideo = createFeatureSelector<VideosType>('videos');

export const selectCards =
  createFeatureSelector<StateVideoCardsType>('videoCards');

export const selectAllVideoList = createSelector(selectVideo, state => {
  return [...state.customCards, ...state.youtubeCardList];
});

export const selectGetYoutubeCards = createSelector(selectVideo, state => {
  return state.youtubeCardList;
});

export const selectGetViewCards = createSelector(selectVideo, state => {
  return [...state.customCards, ...state.youtubeCardList].find(
    card => card.key === state.selectedCardId
  );
});

export const selectGetCards = createSelector(selectCards, state => {
  return [...state.customCardIds, ...state.youtubeCardIds].map(
    (id: string) => state.cards[id]
  );
});

export const selectGetCard = createSelector(selectCards, state => {
  return [...state.customCardIds, ...state.youtubeCardIds].map(
    (id: string) => state.cards[id]
  );
});

export const selectGetOpenedCard = createSelector(selectCards, state => {
  return state.cards[state.openedCard];
});

export const selectGetDataCards = createSelector(selectCards, state => {
  return state.cards;
});

export const selectLikedCards = createSelector(selectCards, state => {
  console.log(state.likedCardIds);
  return state.likedCardIds.map(id => state.cards[id]);
});
