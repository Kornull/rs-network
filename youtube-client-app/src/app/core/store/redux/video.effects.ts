import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import { of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardVideoActions, init, setAllVideos } from './video.actions';
import { allVideoListSelector } from './videos.selectors';

@Injectable()
export class VideoEffects {
  loadVideos = createEffect(() => {
    return this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const storedVideo = localStorage.getItem('user-videos');
        if (storedVideo) {
          return of(
            CardVideoActions.setStorageCards({
              allCards: JSON.parse(storedVideo),
            })
          );
        }
        return of(CardVideoActions.setStorageCards({ allCards: [] }));
      })
    );
  });

  saveVideos = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CardVideoActions.addYoutubeCards, setAllVideos),
        concatLatestFrom(() => this.store.select(allVideoListSelector)),
        tap(([actions, cards]) => {
          console.log('ACTION', actions, cards);
          localStorage.setItem('user-videos', JSON.stringify(cards));
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store
  ) {}
}
