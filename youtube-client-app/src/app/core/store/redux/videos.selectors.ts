import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VideosType } from '../models/store-card-details.model';

export const videoSelector = createFeatureSelector<VideosType>('videos');

export const allVideoListSelector = createSelector(videoSelector, state => {
  return state.allCards;
});

export const getYoutubeVideoSelector = createSelector(videoSelector, state => {
  return state.youtubeCardList;
});
