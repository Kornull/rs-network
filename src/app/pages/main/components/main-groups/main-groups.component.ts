import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { GroupsFormComponent } from './groups-form/groups-form.component';
import { RemoveDialogComponent } from '../../../../shared/components';

import { LoggedActions, selectGroupsInfo } from '../../../../core/store/redux';
import { GroupInfo, UserRegisterData } from '../../../../core/store/models';

import LocalStorageService from '../../../../core/services/local-storage/local-storage.service';
import { TimerService } from '../../../../core/services/timer';

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
    private timer: TimerService,
    private store: Store,
    private localStore: LocalStorageService,
    public dialog: MatDialog
  ) {
    this.loginInfo = this.localStore.getLoginInfo();
  }

  ngOnInit(): void {
    this.timer.createTimer('group');
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

    this.getTimerdata();
  }

  ngOnDestroy(): void {
    this.groups$.unsubscribe();
  }

  getTimerdata() {
    this.timeNow$ = this.timer.getCountdown('group');
    this.disabledBtn$ = this.timer.getRunTimer('group');
  }

  updateList() {
    this.timer.startCountdown('group');
    this.getTimerdata();

    this.store.dispatch(LoggedActions.getGroupsList());
  }

  createGroup() {
    this.dialog.open(GroupsFormComponent, { height: '300px', width: '400px' });
  }

  deleteGroup(id: string, title: string) {
    this.dialog.open(RemoveDialogComponent, {
      data: {
        title,
        id,
        isGroup: true,
      },
      minHeight: '200px',
      width: '400px',
    });
  }
}
