import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';

import { GroupInfo } from '../../../../core/store/models';
import { TimerService } from '../../../../core/services';
import { LoggedActions, selectGroupsInfo } from '../../../../core/store/redux';

@Component({
  selector: 'app-main-groups',
  standalone: true,
  imports: [MatButtonModule, AsyncPipe],
  templateUrl: './main-groups.component.html',
  styleUrl: './main-groups.component.scss',
})
export class MainGroupsComponent implements OnInit, OnDestroy {
  groups: GroupInfo[] = [];

  groupsCount: number = 0;

  groups$!: Subscription;

  timeNow$!: Observable<number>;

  disabledBtn$!: Observable<boolean>;

  seconds = 60;

  constructor(
    private timerService: TimerService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.groups$ = this.store
      .select(selectGroupsInfo)
      .pipe(
        tap(res => {
          if (!res.Items.length) {
            this.store.dispatch(LoggedActions.getGroupsList());
          } else {
            this.groups = [...res.Items];
            this.groupsCount = res.Count;
          }
        })
      )
      .subscribe();
    this.timeNow$ = this.timerService.getCountdown();
    this.disabledBtn$ = this.timerService.getRunTimer();
  }

  ngOnDestroy(): void {
    this.groups$.unsubscribe();
  }

  updateList() {
    this.timerService.startCountdown();
    this.store.dispatch(LoggedActions.getGroupsList());
  }
}
