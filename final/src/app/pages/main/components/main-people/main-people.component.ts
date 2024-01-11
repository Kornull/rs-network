import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subscription, catchError, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import {
  LoggedActions,
  selectAllUsersInfo,
  selectGetConversations,
} from '../../../../core/store/redux';

import {
  ConversationDataList,
  UserDataAddConversation,
  UserRegisterData,
} from '../../../../core/store/models';

import { TimerService } from '../../../../core/services/timer';
import LocalStorageService from '../../../../core/services/local-storage/local-storage.service';
import RequestsService from '../../../../core/services/requests/requests.service';
import SnackBarService from '../../../../core/services/snack-bar/snack-bar.service';
import ErrorService from '../../../../core/services/error/error.service';

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

  conversations: ConversationDataList[] = [];

  disabledBtn$!: Observable<boolean>;

  constructor(
    private timer: TimerService,
    private store: Store,
    private router: Router,
    private localStore: LocalStorageService,
    private toast: SnackBarService,
    private request: RequestsService,
    public dialog: MatDialog,
    public errorService: ErrorService
  ) {
    this.loginInfo = this.localStore.getLoginInfo();
  }

  ngOnInit(): void {
    this.timer.createTimer('people');

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

    this.store
      .select(selectGetConversations)
      .pipe(
        tap(res => {
          this.conversations = res;
        })
      )
      .subscribe();

    this.getTimerData();
  }

  ngOnDestroy(): void {
    this.users$.unsubscribe();
  }

  getTimerData() {
    this.timeNow$ = this.timer.getCountdown('people');
    this.disabledBtn$ = this.timer.getRunTimer('people');
  }

  updateList() {
    this.timer.startCountdown('people');
    this.getTimerData();
    this.store.dispatch(LoggedActions.getUsers());
  }

  createPersonalDialog(userId: string) {
    let create = true;
    this.conversations.forEach(conv => {
      if (conv.companionID.S === userId) {
        this.router.navigate([`/conversation/${conv.id.S}`]);
        create = false;
      }
    });

    if (create) {
      this.request
        .createConversation(userId)
        .pipe(
          map(res => {
            this.router.navigate([`/conversation/${res.conversationID}`]);
            this.toast.openSnack('Conversation create', false);
          }),
          catchError((err: HttpErrorResponse) => {
            this.router.navigate([`/`]);

            this.errorService.showError(err);
            return EMPTY;
          })
        )
        .subscribe();
    }
  }
}
