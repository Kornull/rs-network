import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

import { CardDataType, CardInfoType } from '../models/store-card-details.model';

export const init = createAction('[Videos] Init');

export const CardsVideoActions = createActionGroup({
  source: 'VideoCards',
  events: {
    'Add youtube card': props<{ youtubeCard: CardDataType }>(),
    'Add favorite cards from LocalStore': props<{
      favoriteCards: CardInfoType;
    }>(),
    'Add youtube id list': props<{ youtubeCardIds: string[] }>(),
    'Add favorite id list': props<{ favoriteIds: string[] }>(),
    'Add custom card': props<{ customCard: CardDataType }>(),
    'Remove custom card': props<{ delCustomCardId: string }>(),
    'Set card id': props<{ cardId: string }>(),
    'Add favorite card': props<{ likedCardId: string }>(),
    'Add count pages': props<{ idsLength: number }>(),
    'Update current page': props<{ pageNow: number }>(),
    'Clear store': emptyProps(),
  },
});
