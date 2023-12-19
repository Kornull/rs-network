import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import { Observable, map, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { cardsVideoActions, init } from './video.actions';
import {
  selectGetAllIdsCount,
  selectGetFavoriteCardsFromLocalStore,
} from './videos.selectors';
import { CountCardsOnPage } from '../models/types';

@Injectable()
export class VideoEffects {
  countPages$: Observable<number>;

  countPages: number;

  constructor(
    private actions$: Actions,
    private store: Store
  ) {}

  loadVideos = createEffect(() => {
    return this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const storedVideo = localStorage.getItem('user-videos');
        if (storedVideo !== null) {
          return of(
            cardsVideoActions.addFavoriteCardsFromLocalStore({
              favoriteCards: { ...JSON.parse(storedVideo) },
            }),
            cardsVideoActions.addFavoriteIdList({
              favoriteIds: Object.keys({ ...JSON.parse(storedVideo) }),
            })
          );
        }
        return of(
          cardsVideoActions.addFavoriteCardsFromLocalStore({
            favoriteCards: {},
          })
        );
      })
    );
  });

  saveVideos = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(cardsVideoActions.addFavoriteCard),
        concatLatestFrom(() =>
          this.store.select(selectGetFavoriteCardsFromLocalStore)
        ),
        tap(([, cards]) => {
          localStorage.setItem('user-videos', JSON.stringify(cards));
        })
      );
    },
    { dispatch: false }
  );

  pagesVideos = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        cardsVideoActions.addCustomCard,
        cardsVideoActions.addYoutubeCard,
        cardsVideoActions.removeCustomCard
      ),
      switchMap(() =>
        this.store.select(selectGetAllIdsCount).pipe(
          map(idsLength =>
            cardsVideoActions.addCountPages({
              idsLength: idsLength / CountCardsOnPage.COUNT_CARDS,
            })
          )
        )
      )
    );
  });
}
