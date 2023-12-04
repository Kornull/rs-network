import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

import { CardDataType, CardInfoType } from '../models/store-card-details.model';

export const init = createAction('[VIDEOS] Init');

export const cardsVideoActions = createActionGroup({
  source: 'VIDEOS',
  events: {
    'Add youtube card': props<{ youtubeCard: CardDataType }>(),
    'Add favorite cards from LocalStore': props<{
      favoriteCards: CardInfoType;
    }>(),
    'Add favorite id list': props<{ favoriteIds: string[] }>(),
    'Add custom card': props<{ customCard: CardDataType }>(),
    'Remove custom card': props<{ delCustomCardId: string }>(),
    'Add favorite card': props<{ likedCardId: string }>(),
    'Add count pages': props<{ idsLength: number }>(),
    'Update current page': props<{ pageNow: number }>(),
    'Clear youtube id list': emptyProps(),
    'Clear store': emptyProps(),
  },
});
