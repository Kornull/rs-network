import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  map,
  of,
  takeWhile,
  timer,
} from 'rxjs';

import { TimersData } from '../../store/models';

@Injectable({
  providedIn: 'any',
})
export class TimerService {
  private subscribeTimer$!: Subscription;

  private timers: Map<string, TimersData> = new Map();

  private readonly duration: number = 60;

  startCountdown(id: string): void {
    const count$ = new BehaviorSubject<number>(0);
    const isDisabled$ = new BehaviorSubject<boolean>(false);
    let runTimer = false;
    this.subscribeTimer$ = timer(0, 1000)
      .pipe(
        map(seconds => this.duration - seconds),
        takeWhile(secondsRemaining => secondsRemaining >= 0)
      )
      .subscribe(res => {
        count$.next(res);

        if (!runTimer) {
          isDisabled$.next(true);
          runTimer = true;
        }
        if (res === 0) {
          isDisabled$.next(false);
          runTimer = false;
          this.stopTimer(id);
        }
      });
    this.timers.set(id, {
      timerCount: count$.asObservable(),
      timerBtnIsDisabled: isDisabled$.asObservable(),
      timer: this.subscribeTimer$,
    });
  }

  createTimer(id: string) {
    if (!this.timers.has(id)) {
      this.timers.set(id, {
        timerCount: of(0),
        timerBtnIsDisabled: of(false),
        timer: this.subscribeTimer$,
      });
    }
  }

  stopTimer(id: string): void {
    this.timers.get(id)?.timer.unsubscribe();
  }

  getCountdown(id: string): Observable<number> {
    return this.timers.get(id)!.timerCount;
  }

  getRunTimer(id: string): Observable<boolean> {
    return this.timers.get(id)!.timerBtnIsDisabled;
  }
}
