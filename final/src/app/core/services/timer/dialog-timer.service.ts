import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  map,
  takeWhile,
  timer,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogTimerService {
  private subscribeTimer$!: Subscription;

  private runTimer = false;

  private readonly countdown$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  private readonly duration: number = 60;

  private readonly runTimer$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  startCountdown(): void {
    this.subscribeTimer$ = timer(0, 1000)
      .pipe(
        map(seconds => this.duration - seconds),
        takeWhile(secondsRemaining => secondsRemaining >= 0)
      )
      .subscribe(res => {
        this.countdown$.next(res);
        if (!this.runTimer) {
          this.runTimer$.next(true);
          this.runTimer = true;
        }
        if (res === 0) {
          this.runTimer$.next(false);
          this.runTimer = false;
          this.stopTimer();
        }
      });
  }

  stopTimer(): void {
    this.subscribeTimer$.unsubscribe();
  }

  getCountdown(): Observable<number> {
    return this.countdown$.asObservable();
  }

  getRunTimer(): Observable<boolean> {
    return this.runTimer$.asObservable();
  }
}
