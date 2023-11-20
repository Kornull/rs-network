import { createAction, createActionGroup, props } from '@ngrx/store';
import { CardDataType } from '../models/store-card-details.model';

export const init = createAction('[Videos] Init');

export const setAllVideos = createAction('[Videos] Get Videos');
export const getAllVideos = createAction('[Videos] Get Videos');

export const CardVideoActions = createActionGroup({
  source: 'Video',
  events: {
    'Add youtube cards': props<{ youtubeCards: CardDataType[] }>(),
    'Add custom card': props<{ customCard: CardDataType }>(),
    'Add favorite card': props<{ favoriteCard: CardDataType }>(),
    'Set storage cards': props<{ allCards: CardDataType[] }>(),
    'Get card': props<{ cardId: string }>(),
  },
});
