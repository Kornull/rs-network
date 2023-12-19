import { Component, OnInit, Pipe } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';

import {
  GroupMessage,
  GroupMessagesDataType,
  UserRegisterData,
} from '../../../core/store/models';
import { DEFMESS, MESSAGES } from './messageGroup';
import { selectGroupMessages } from '../../../core/store/redux';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../core/services';

@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-dialog.component.html',
  styleUrl: './group-dialog.component.scss',
})
export class GroupDialogComponent {
  messages: GroupMessagesDataType[] = DEFMESS;

  localData: UserRegisterData | null;

  groupId: string = '';

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private localStore: LocalStorageService
  ) {
    this.localData = this.localStore.getLoginInfo();
  }

  // ngOnInit(): void {
  //   this.route.params.subscribe((params: Params) => {
  //     this.groupId = params['id'];
  //   });
  //   this.store
  //     .select(selectGroupMessages({ groupId: this.groupId }))
  //     .pipe()
  //     .subscribe();
  // }
}
