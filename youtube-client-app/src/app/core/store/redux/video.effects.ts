import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import { of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardsVideoActions, init } from './video.actions';
import { selectGetCustomCards } from './videos.selectors';

@Injectable()
export class VideoEffects {
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
            CardsVideoActions.addCustomCardsFromLocalStore({
              customCards: { ...JSON.parse(storedVideo) },
            }),
            CardsVideoActions.addCustomIdList({
              customCardIds: Object.keys({ ...JSON.parse(storedVideo) }),
            })
          );
        }
        return of(
          CardsVideoActions.addCustomCardsFromLocalStore({ customCards: {} })
        );
      })
    );
  });

  saveVideos = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          CardsVideoActions.addCustomCard,
          CardsVideoActions.removeCustomCard
        ),
        concatLatestFrom(() => this.store.select(selectGetCustomCards)),
        tap(([, cards]) => {
          localStorage.setItem('user-videos', JSON.stringify(cards));
        })
      );
    },
    { dispatch: false }
  );
}
