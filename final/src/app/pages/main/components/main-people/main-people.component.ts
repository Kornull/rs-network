import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { UserList, UserRegisterData } from '../../../../core/store/models';
import { LocalStorageService, TimerService } from '../../../../core/services';
import { LoggedActions } from '../../../../core/store/redux';
import { USERS } from './users';

@Component({
  selector: 'app-main-people',
  standalone: true,
  imports: [MatButtonModule, AsyncPipe, MatIconModule],
  providers: [TimerService],
  templateUrl: './main-people.component.html',
  styleUrl: './main-people.component.scss',
})
export class MainPeopleComponent implements OnInit {
  users: UserList[] = USERS.Items;

  usersCount: number = 0;

  loginInfo: UserRegisterData | null = null;

  timeNow$!: Observable<number>;

  disabledBtn$!: Observable<boolean>;

  constructor(
    private timerService: TimerService,
    private store: Store,
    private localStore: LocalStorageService,
    public dialog: MatDialog
  ) {
    this.loginInfo = this.localStore.getLoginInfo();
  }

  ngOnInit(): void {
    this.timeNow$ = this.timerService.getCountdown();
    this.disabledBtn$ = this.timerService.getRunTimer();
  }

  updateList() {
    this.timerService.startCountdown();
    // this.store.dispatch(LoggedActions.getGroupsList());
  }
}
