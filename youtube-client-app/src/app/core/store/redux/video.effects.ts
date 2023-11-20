import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import { of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardsVideoActions, init } from './video.actions';
import { selectGetDataCards } from './videos.selectors';

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
            CardsVideoActions.addYoutubeCardsMok({
              youtubeCardsMok: { ...JSON.parse(storedVideo) },
            }),
            CardsVideoActions.addYoutubeIdList({
              cardIds: Object.keys(JSON.parse(storedVideo)),
            })
          );
        }
        return of(
          CardsVideoActions.addYoutubeCardsMok({ youtubeCardsMok: {} })
        );
      })
    );
  });

  saveVideos = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          CardsVideoActions.addYoutubeIdList,
          CardsVideoActions.addCustomCard
        ),
        concatLatestFrom(() => this.store.select(selectGetDataCards)),
        tap(([actions, cards]) => {
          localStorage.setItem('user-videos', JSON.stringify(cards));
        })
      );
    },
    { dispatch: false }
  );
}
