import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VideosType } from '../models/store-card-details.model';

export const selectVideo = createFeatureSelector<VideosType>('videos');

export const selectAllVideoList = createSelector(selectVideo, state => {
  return [...state.customCards, ...state.youtubeCardList];
});

export const selectGetYoutubeCards = createSelector(selectVideo, state => {
  return state.youtubeCardList;
});
