import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, map, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

import {
  GroupMessageData,
  GroupMessagesDataType,
  UserListPersonalData,
  UserRegisterData,
} from '../../../core/store/models';
import { DEFMESS, MESSAGES } from './messageGroup';
import {
  AddUserNameService,
  LocalStorageService,
} from '../../../core/services';
import {
  ConversationActions,
  selectAllUsersInfo,
  selectGetUsers,
  selectGroupMessages,
} from '../../../core/store/redux';
import { SortingMessagesPipe } from '../../../shared/pipe';

@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [CommonModule, SortingMessagesPipe],
  templateUrl: './group-dialog.component.html',
  styleUrl: './group-dialog.component.scss',
})
export class GroupDialogComponent implements OnInit, OnDestroy {
  messages: GroupMessagesDataType[] = [];

  localData: UserRegisterData | null;

  groupMessages: GroupMessageData[] = [];

  usersList: UserListPersonalData[] = [];

  getGroupMessagesSubscribe$!: Subscription;

  getUsersNamesSubscribe$!: Subscription;

  groupId: string = '';

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private addNameService: AddUserNameService
  ) {
    this.localData = this.localStore.getLoginInfo();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.groupId = params['id'];
    });

    this.store.dispatch(
      ConversationActions.setGroupMessages({
        dialog: {
          groupId: this.groupId,
          messageList: MESSAGES.Items,
        },
      })
    );

    this.getGroupMessagesSubscribe$ = this.store
      .select(selectGroupMessages({ groupId: this.groupId }))
      .pipe(tap(data => (this.groupMessages = data)))
      .subscribe();

    this.getUsersNamesSubscribe$ = this.store
      .select(selectGetUsers)
      .pipe(
        map(data =>
          this.addNameService.changeIdToName(this.groupMessages, data)
        )
      )
      .subscribe(res => {
        this.messages = res;
      });
  }

  ngOnDestroy(): void {
    this.getGroupMessagesSubscribe$.unsubscribe();
    this.getUsersNamesSubscribe$.unsubscribe();
  }
}
