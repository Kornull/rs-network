import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { GroupsFormComponent } from './groups-form/groups-form.component';

import { LoggedActions, selectGroupsInfo } from '../../../../core/store/redux';
import { GroupInfo, UserRegisterData } from '../../../../core/store/models';
import {
  GroupTimerService,
  LocalStorageService,
} from '../../../../core/services';
import { GroupDeleteComponent } from '../../../../shared/components/group-delete/groups-delete.component';

@Component({
  selector: 'app-main-groups',
  standalone: true,
  imports: [MatButtonModule, AsyncPipe, MatIconModule, NgClass, RouterLink],
  templateUrl: './main-groups.component.html',
  styleUrl: './main-groups.component.scss',
})
export class MainGroupsComponent implements OnInit, OnDestroy {
  groups: GroupInfo[] = [];

  groupsCount: number = 0;

  loginInfo: UserRegisterData | null = null;

  groups$!: Subscription;

  timeNow$!: Observable<number>;

  disabledBtn$!: Observable<boolean>;

  constructor(
    private timer: GroupTimerService,
    private store: Store,
    private localStore: LocalStorageService,
    public dialog: MatDialog
  ) {
    this.loginInfo = this.localStore.getLoginInfo();
  }

  ngOnInit(): void {
    this.groups$ = this.store
      .select(selectGroupsInfo)
      .pipe(
        tap(res => {
          if (!res.Count) {
            this.store.dispatch(LoggedActions.getGroupsList());
          } else {
            this.groups = [...res.Items];
            this.groupsCount = res.Count;
          }
        })
      )
      .subscribe();
    this.timeNow$ = this.timer.getCountdown();
    this.disabledBtn$ = this.timer.getRunTimer();
  }

  ngOnDestroy(): void {
    this.groups$.unsubscribe();
  }

  updateList() {
    this.timer.startCountdown();
    this.store.dispatch(LoggedActions.getGroupsList());
  }

  createGroup() {
    this.dialog.open(GroupsFormComponent, { height: '300px', width: '400px' });
  }

  deleteGroup(id: string, title: string) {
    this.dialog.open(GroupDeleteComponent, {
      data: {
        groupTitle: title,
        id,
      },
      minHeight: '200px',
      width: '400px',
    });
  }
}
