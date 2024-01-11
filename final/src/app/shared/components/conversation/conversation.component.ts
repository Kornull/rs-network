import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { EMPTY, Observable, Subject, takeUntil, tap } from 'rxjs';
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

  destroy$: Subject<boolean> = new Subject<boolean>();

  lastSentTime!: string;

  groupCreatorId: string = '';

  isUserLogged: boolean = false;

  openModal: boolean = false;

  title: string =
    this.dialogKey === DialogPageKey.PERSONAL ? 'Personal dialog' : '';

  idDialog: string = '';

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
    this.store
      .select(selectIsUserLogged)
      .pipe(tap(res => (this.isUserLogged = res)))
      .subscribe();

    this.store
      .select(selectGetUsers)
      .pipe(
        tap(data => {
          if (!data.length && this.isUserLogged) {
            this.store.dispatch(ConversationActions.updateDialogUsers());
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.route.params.subscribe((params: Params) => {
      this.idDialog = params['id'];
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
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  updateMessage() {
    if (this.messages.length) {
      this.lastSentTime = this.messages[this.messages.length - 1].time;
    }
    if (this.dialogKey === DialogPageKey.PERSONAL) this.getPersonalMessages();
    if (this.dialogKey === DialogPageKey.GROUP)
      this.getGroupConversatonMessages();
  }

  getPersonalMessages() {
    this.store.dispatch(
      ConversationActions.getUserMessages({
        dialog: {
          userId: this.idDialog,
          since: this.lastSentTime,
        },
      })
    );
  }

  getGroupConversatonMessages() {
    this.store.dispatch(
      ConversationActions.getGroupMessages({
        dialog: {
          groupId: this.idDialog,
          since: this.lastSentTime,
        },
      })
    );
  }

  updateUserMessages() {
    this.store
      .select(selectGetPersonalConversations({ userId: this.idDialog }))
      .pipe(
        tap(data => {
          if (data.messages !== undefined && data.messages.length) {
            this.messages = this.addNameService.changeIdToName(
              data.messages,
              data.users
            );
          } else {
            if (
              this.isUserLogged &&
              !this.openModal &&
              data.messages === undefined
            ) {
              this.store.dispatch(
                ConversationActions.getUserMessages({
                  dialog: { userId: this.idDialog },
                })
              );
            }
            this.messages = [];
          }
          return EMPTY;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  updateGroupMessages() {
    this.store
      .select(selectGroupMessages({ groupId: this.idDialog }))
      .pipe(
        tap(data => {
          if (data.messages !== undefined && data.messages.length) {
            this.messages = this.addNameService.changeIdToName(
              data.messages,
              data.users
            );
          } else {
            if (
              this.isUserLogged &&
              !this.openModal &&
              (data.messages === undefined || !data.messages.length)
            ) {
              this.store.dispatch(
                ConversationActions.getGroupMessages({
                  dialog: { groupId: this.idDialog },
                })
              );
            }
            this.messages = [];
          }
          return EMPTY;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getTimerData() {
    this.timeNow$ = this.timer.getCountdown(this.idDialog);
    this.disabledBtn$ = this.timer.getRunTimer(this.idDialog);
  }

  runUpdateMessage() {
    this.timer.startCountdown(this.idDialog);
    this.getTimerData();
    this.updateMessage();
  }

  updateDialogTitle() {
    this.store
      .select(selectGroupsInfo)
      .pipe(
        tap(arr => {
          arr.Items.forEach(element => {
            if (element.id.S === this.idDialog) this.title = element.name.S;
            if (
              element.id.S === this.idDialog &&
              element.createdBy.S === this.localData?.uid
            ) {
              this.groupCreatorId = element.createdBy.S;
            }

            if (this.title.length > 30) {
              this.title = `${this.title.slice(0, 30)}...`;
            }
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  deleteDialog() {
    this.openModal = true;
    this.dialog.open(RemoveDialogComponent, {
      data: {
        title: this.title,
        id: this.idDialog,
        isGroup: this.isGroup,
        isOpenGroup: this.isGroupOpened,
        isPersonal: this.isConversationOpened,
      },
      minHeight: '200px',
      width: '400px',
    });
  }
}
