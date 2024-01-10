import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { Observable, Subscription, map, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ConversationFormComponent } from './conversation-form/conversation-form.component';
import { RemoveDialogComponent } from '../remove-dialog/remove-dialog.component';

import {
  GroupMessagesDataType,
  UserRegisterData,
  GroupMessageData,
  UserListPersonalData,
  DialogPageKey,
} from '../../../core/store/models';
import {
  selectIsUserLogged,
  selectGetUsers,
  ConversationActions,
  selectGetPersonalConversations,
  selectGroupsInfo,
  selectGroupMessages,
} from '../../../core/store/redux';

import LocalStorageService from '../../../core/services/local-storage/local-storage.service';
import AddUserNameService from '../../../core/services/add-user-name/add-user-name.service';
import { TimerService } from '../../../core/services/timer';

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
  @Input() dialogKey: string = '';

  @Input() isGroup: boolean = false;

  @Input() isGroupOpened: boolean = false;

  @Input() isConversationOpened: boolean = false;

  messages: GroupMessagesDataType[] = [];

  localData: UserRegisterData | null;

  groupMessages: GroupMessageData[] = [];

  usersList: UserListPersonalData[] = [];

  timeNow$!: Observable<number>;

  disabledBtn$!: Observable<boolean>;

  getPersonMessagesSubscribe$!: Subscription;

  updateMessagesSubscribe$!: Subscription;

  updateDialogsSubscribe$!: Subscription;

  updateTitleSubscribe$!: Subscription;

  getGroupMessagesSubscribe$!: Subscription;

  isUserLogged$!: Subscription;

  lastSentTime!: string;

  groupCreatorId: string = '';

  isUserLogged: boolean = false;

  title: string =
    this.dialogKey === DialogPageKey.PERSONAL ? 'Personal dialog' : '';

  ID: string = '';

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private addNameService: AddUserNameService,
    private timer: TimerService,
    private dialog: MatDialog
  ) {
    this.localData = this.localStore.getLoginInfo();
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
      this.ID = params['id'];
      this.timer.createTimer(params['id']);
    });

    if (this.dialogKey === DialogPageKey.PERSONAL) this.updateUserMessages();
    if (this.dialogKey === DialogPageKey.GROUP) {
      this.updateDialogTitle();
      this.updateGroupMessages();
    }

    this.getTimerData();
    this.updateMessage();
  }

  ngOnDestroy(): void {
    if (this.dialogKey === DialogPageKey.GROUP) {
      this.getGroupMessagesSubscribe$.unsubscribe();
      this.updateTitleSubscribe$.unsubscribe();
    } else {
      this.getPersonMessagesSubscribe$.unsubscribe();
    }
    this.updateDialogsSubscribe$.unsubscribe();
    this.isUserLogged$.unsubscribe();
  }

  getPersonalMessages() {
    this.store.dispatch(
      ConversationActions.getUserMessages({
        dialog: {
          userId: this.ID,
          since: this.lastSentTime,
        },
      })
    );
  }

  getGroupConversatonMessages() {
    this.store.dispatch(
      ConversationActions.getGroupMessages({
        dialog: {
          groupId: this.ID,
          since: this.lastSentTime,
        },
      })
    );
  }

  updateUserMessages() {
    this.getPersonMessagesSubscribe$ = this.store
      .select(selectGetPersonalConversations({ userId: this.ID }))
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
                  dialog: { userId: this.ID },
                })
              );
            }
            this.messages = [];
          }
        })
      )
      .subscribe();
  }

  updateGroupMessages() {
    this.getGroupMessagesSubscribe$ = this.store
      .select(selectGroupMessages({ groupId: this.ID }))
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
                ConversationActions.getGroupMessages({
                  dialog: { groupId: this.ID },
                })
              );
            }
            this.messages = [];
          }
        })
      )
      .subscribe();
  }

  getTimerData() {
    this.timeNow$ = this.timer.getCountdown(this.ID);
    this.disabledBtn$ = this.timer.getRunTimer(this.ID);
  }

  runUpdateMessage() {
    this.timer.startCountdown(this.ID);
    this.getTimerData();
    this.updateMessage();
  }

  updateMessage() {
    if (this.messages.length) {
      this.lastSentTime = this.messages[this.messages.length - 1].time;
      if (this.dialogKey === DialogPageKey.PERSONAL) this.getPersonalMessages();
      if (this.dialogKey === DialogPageKey.GROUP)
        this.getGroupConversatonMessages();
    }
  }

  updateDialogTitle() {
    this.updateTitleSubscribe$ = this.store
      .select(selectGroupsInfo)
      .pipe(
        tap(arr => {
          arr.Items.forEach(element => {
            if (element.id.S === this.ID) this.title = element.name.S;
            if (
              element.id.S === this.ID &&
              element.createdBy.S === this.localData?.uid
            ) {
              this.groupCreatorId = element.createdBy.S;
            }

            if (this.title.length > 30) {
              this.title = `${this.title.slice(0, 30)}...`;
            }
          });
        })
      )
      .subscribe();
  }

  deleteDialog() {
    this.dialog.open(RemoveDialogComponent, {
      data: {
        title: this.title,
        id: this.ID,
        isGroup: this.isGroup,
        isOpenGroup: this.isGroupOpened,
        isPersonal: this.isConversationOpened,
      },
      minHeight: '200px',
      width: '400px',
    });
  }
}
