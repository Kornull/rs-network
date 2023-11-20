import { createAction, createActionGroup, props } from '@ngrx/store';
import { CardDataType, CardInfoType } from '../models/store-card-details.model';

export const init = createAction('[Videos] Init');

export const setAllVideos = createAction('[Videos] Get Videos');
export const getAllVideos = createAction('[Videos] Get Videos');

export const CardVideoActions = createActionGroup({
  source: 'Video',
  events: {
    'Add youtube cards': props<{ youtubeCards: CardDataType[] }>(),
    'Add custom card': props<{ customCard: CardDataType }>(),
    'Set card id': props<{ cardId: string }>(),
  },
});

export const CardsVideoActions = createActionGroup({
  source: 'VideoCards',
  events: {
    'Add youtube card': props<{ youtubeCard: CardDataType }>(),
    'Add like card': props<{ likeId: string }>(),
    'Add youtube cards mok': props<{ youtubeCardsMok: CardInfoType }>(),
    'Add youtube id list': props<{ cardIds: string[] }>(),
    'Add custom card': props<{ customCard: CardDataType }>(),
    'Set card id': props<{ cardId: string }>(),
    'Liked card': props<{ likedCardId: string }>(),
  },
});
