import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { Observable, Subscription, map, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  ConversationActions,
  selectGetPersonalConversations,
  selectGetUsers,
  selectIsUserLogged,
} from '../../../../core/store/redux';

import { GroupDeleteComponent } from '../../../../shared/components/group-delete/groups-delete.component';

import { ConversationFormComponent } from '../../../../shared';

import {
  DialogPageKey,
  GroupMessageData,
  GroupMessagesDataType,
  UserListPersonalData,
  UserRegisterData,
} from '../../../../core/store/models';
import { TimerService } from '../../../../core/services/timer';
import LocalStorageService from '../../../../core/services/local-storage/local-storage.service';
import AddUserNameService from '../../../../core/services/add-user-name/add-user-name.service';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [
    CommonModule,
    ConversationFormComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss',
})
export class ConversationComponent implements OnInit, OnDestroy {
  messages: GroupMessagesDataType[] = [];

  localData: UserRegisterData | null;

  title: string = 'Personal dialog';

  groupMessages: GroupMessageData[] = [];

  usersList: UserListPersonalData[] = [];

  timeNow$!: Observable<number>;

  disabledBtn$!: Observable<boolean>;

  getPersonMessagesSubscribe$!: Subscription;

  updateMessagesSubscribe$!: Subscription;

  updateDialogsSubscribe$!: Subscription;

  updateTitleSubscribe$!: Subscription;

  isUserLogged$!: Subscription;

  lastSentTime!: string;

  userId: string = '';

  groupCreatorId: string = '';

  isUserLogged: boolean = false;

  dialogKey: string;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private addNameService: AddUserNameService,
    private timer: TimerService,
    private dialog: MatDialog
  ) {
    this.localData = this.localStore.getLoginInfo();
    this.dialogKey = DialogPageKey.PERSONAL;
  }

  ngOnInit(): void {
    this.isUserLogged$ = this.store
      .select(selectIsUserLogged)
      .pipe(tap(res => (this.isUserLogged = res)))
      .subscribe();

    this.updateDialogsSubscribe$ = this.store
      .select(selectGetUsers)
      .pipe(
        tap(data => {
          if (!data.length && this.isUserLogged) {
            this.store.dispatch(ConversationActions.updateDialogUsers());
          }
        })
      )
      .subscribe();

    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.timer.createTimer(params['id']);
    });

    this.getPersonMessagesSubscribe$ = this.store
      .select(selectGetPersonalConversations({ userId: this.userId }))
      .pipe(
        map(data => {
          if (data.messages !== undefined && data.messages.length) {
            this.messages = this.addNameService.changeIdToName(
              data.messages,
              data.users
            );
          } else {
            if (this.isUserLogged) {
              this.store.dispatch(
                ConversationActions.getUserMessages({
                  dialog: { userId: this.userId },
                })
              );
            }
            this.messages = [];
          }
        })
      )
      .subscribe();

    if (this.messages.length) {
      this.lastSentTime = this.messages[this.messages.length - 1].time;
      this.store.dispatch(
        ConversationActions.getUserMessages({
          dialog: {
            userId: this.userId,
            since: this.lastSentTime,
          },
        })
      );
    }

    this.getTimerData();
  }

  getTimerData() {
    this.timeNow$ = this.timer.getCountdown(this.userId);
    this.disabledBtn$ = this.timer.getRunTimer(this.userId);
  }

  ngOnDestroy(): void {
    this.getPersonMessagesSubscribe$.unsubscribe();
    this.updateDialogsSubscribe$.unsubscribe();
    this.isUserLogged$.unsubscribe();
  }

  runUpdateMessage() {
    this.timer.startCountdown(this.userId);
    this.getTimerData();
    this.updateMessage();
  }

  updateMessage() {
    if (this.messages.length) {
      this.lastSentTime = this.messages[this.messages.length - 1].time;
      this.store.dispatch(
        ConversationActions.getUserMessages({
          dialog: {
            userId: this.userId,
            since: this.lastSentTime,
          },
        })
      );
    }
  }

  deleteGroup() {
    this.dialog.open(GroupDeleteComponent, {
      data: {
        groupTitle: this.title,
        id: this.userId,
        isOpenGroup: true,
        isPersonal: true,
      },
      minHeight: '200px',
      width: '400px',
    });
  }
}
