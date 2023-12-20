import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
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

import {
  LocalStorageService,
  RequestsService,
  SnackBarService,
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

  conversations: ConversationDataList[] = [];

  disabledBtn$!: Observable<boolean>;

  constructor(
    private timer: UserTimerService,
    private store: Store,
    private router: Router,
    private localStore: LocalStorageService,
    private toast: SnackBarService,
    private request: RequestsService,
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

    this.store
      .select(selectGetConversations)
      .pipe(
        tap(res => {
          this.conversations = res;
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

  createPersonalDialog(userId: string) {
    let create = true;
    this.conversations.forEach(conv => {
      if (conv.companionID.S === userId) {
        this.router.navigate([`/conversation/${conv.id.S}`]);
        create = false;
      }
    });

    if (create)
      this.request
        .createConversation(userId)
        .pipe(
          map(res => {
            this.router.navigate([`/conversation/${res.conversationID}`]);
            this.toast.openSnack('Conversation create', false);
          }),
          catchError(err => {
            const { error } = err;
            if (error === null) {
              this.toast.openSnack(err.statusText, true);
            } else {
              this.toast.openSnack(error.message, true);
            }
            return EMPTY;
          })
        )
        .subscribe();
  }
}
