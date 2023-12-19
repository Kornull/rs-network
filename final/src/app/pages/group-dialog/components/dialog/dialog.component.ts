import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, map, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

import {
  ConversationActions,
  selectGetUsers,
  selectGroupMessages,
} from '../../../../core/store/redux';

import {
  AddUserNameService,
  LocalStorageService,
} from '../../../../core/services';

import { DialogFormComponent } from '../dialog-form/dialog-form.component';

import {
  GroupMessageData,
  GroupMessagesDataType,
  UserListPersonalData,
  UserRegisterData,
} from '../../../../core/store/models';

@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [CommonModule, DialogFormComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit, OnDestroy {
  messages: GroupMessagesDataType[] = [];

  localData: UserRegisterData | null;

  groupMessages: GroupMessageData[] = [];

  usersList: UserListPersonalData[] = [];

  getGroupMessagesSubscribe$!: Subscription;

  updateMessagesSubscribe$!: Subscription;

  updateDialogsSubscribe$!: Subscription;

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
    this.updateDialogsSubscribe$ = this.store
      .select(selectGetUsers)
      .pipe(
        tap(data => {
          if (!data.length) {
            this.store.dispatch(ConversationActions.updateDialogUsers());
          }
        })
      )
      .subscribe();

    this.route.params.subscribe((params: Params) => {
      this.groupId = params['id'];
    });

    this.getGroupMessagesSubscribe$ = this.store
      .select(selectGroupMessages({ groupId: this.groupId }))
      .pipe(
        map(data => {
          if (data.messages) {
            this.messages = [
              ...new Set(
                this.addNameService.changeIdToName(data.messages, data.users)
              ),
            ];
          } else {
            this.store.dispatch(
              ConversationActions.getGroupMessages({
                dialog: { groupId: this.groupId },
              })
            );
            this.messages = [];
          }
        })
      )
      .subscribe();

    if (this.messages.length) {
      this.store.dispatch(
        ConversationActions.getGroupMessages({
          dialog: {
            groupId: this.groupId,
            since: this.messages[this.messages.length - 1].time,
          },
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.getGroupMessagesSubscribe$.unsubscribe();
    this.updateDialogsSubscribe$.unsubscribe();
  }
}
