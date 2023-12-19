import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import {
  LoggedActions,
  selectAllUsersInfo,
} from '../../../../core/store/redux';

import {
  UserDataAddConversation,
  UserRegisterData,
} from '../../../../core/store/models';

import {
  LocalStorageService,
  UserTimerService,
} from '../../../../core/services';

@Component({
  selector: 'app-main-people',
  standalone: true,
  imports: [MatButtonModule, AsyncPipe, MatIconModule, NgClass],
  templateUrl: './main-people.component.html',
  styleUrl: './main-people.component.scss',
})
export class MainPeopleComponent implements OnInit, OnDestroy {
  users: UserDataAddConversation[] = [];

  usersCount: number = 0;

  users$!: Subscription;

  loginInfo: UserRegisterData | null = null;

  timeNow$!: Observable<number>;

  disabledBtn$!: Observable<boolean>;

  constructor(
    private timer: UserTimerService,
    private store: Store,
    private localStore: LocalStorageService,
    public dialog: MatDialog
  ) {
    this.loginInfo = this.localStore.getLoginInfo();
  }

  ngOnInit(): void {
    this.users$ = this.store
      .select(selectAllUsersInfo)
      .pipe(
        tap(res => {
          if (!res.count) {
            this.store.dispatch(LoggedActions.getUsers());
          } else {
            this.users = [
              ...res.users.filter(user => user.uid.S !== this.loginInfo?.uid),
            ];
            this.usersCount = res.count;
          }
        })
      )
      .subscribe();

    this.timeNow$ = this.timer.getCountdown();
    this.disabledBtn$ = this.timer.getRunTimer();
  }

  ngOnDestroy(): void {
    this.users$.unsubscribe();
  }

  updateList() {
    this.timer.startCountdown();
    this.store.dispatch(LoggedActions.getUsers());
  }
}
