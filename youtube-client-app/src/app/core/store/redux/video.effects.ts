import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import { of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardVideoActions, init } from './video.actions';
import { selectAllVideoList } from './videos.selectors';

@Injectable()
export class VideoEffects {
  loadVideos = createEffect(() => {
    return this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const storedVideo = localStorage.getItem('user-videos');
        if (storedVideo !== null) {
          return of(
            CardVideoActions.addYoutubeCards({
              youtubeCards: JSON.parse(storedVideo),
            })
          );
        }
        return of(CardVideoActions.addYoutubeCards({ youtubeCards: [] }));
      })
    );
  });

  saveVideos = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CardVideoActions.addYoutubeCards),
        concatLatestFrom(() => this.store.select(selectAllVideoList)),
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
