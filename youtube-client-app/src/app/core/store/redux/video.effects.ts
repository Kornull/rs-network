import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import { Observable, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardsVideoActions, init } from './video.actions';
import {
  selectGetAllIdsCount,
  selectGetFavoriteCardsForLocalStore,
} from './videos.selectors';

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
            CardsVideoActions.addFavoriteCardsFromLocalStore({
              favoriteCards: { ...JSON.parse(storedVideo) },
            }),
            CardsVideoActions.addFavoriteIdList({
              favoriteIds: Object.keys({ ...JSON.parse(storedVideo) }),
            })
          );
        }
        return of(
          CardsVideoActions.addFavoriteCardsFromLocalStore({
            favoriteCards: {},
          })
        );
      })
    );
  });

  saveVideos = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CardsVideoActions.addFavoriteCard),
        concatLatestFrom(() =>
          this.store.select(selectGetFavoriteCardsForLocalStore)
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
        CardsVideoActions.addCustomCard,
        CardsVideoActions.addYoutubeCard,
        CardsVideoActions.removeCustomCard
      ),
      switchMap(() => {
        this.countPages$ = this.store.select(selectGetAllIdsCount);
        this.countPages$.subscribe(data => (this.countPages = data));

        return of(
          CardsVideoActions.addCountPages({
            idsLength: this.countPages,
          })
        );
      })
    );
  });
}
