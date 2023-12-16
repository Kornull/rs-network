import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { GroupInfo, UserRegisterData } from '../../../../core/store/models';
import { LocalStorageService, TimerService } from '../../../../core/services';
import { LoggedActions, selectGroupsInfo } from '../../../../core/store/redux';
import { GroupsFormComponent } from './groups-form/groups-form.component';
import { GROUPS } from './groups';
import { GroupDeleteComponent } from './group-delete/groups-delete.component';

@Component({
  selector: 'app-main-groups',
  standalone: true,
  imports: [MatButtonModule, AsyncPipe, MatIconModule],
  providers: [TimerService],
  templateUrl: './main-groups.component.html',
  styleUrl: './main-groups.component.scss',
})
export class MainGroupsComponent implements OnInit {
  groups: GroupInfo[] = GROUPS.Items;

  groupsCount: number = 0;

  loginInfo: UserRegisterData | null = null;

  groups$!: Subscription;

  timeNow$!: Observable<number>;

  disabledBtn$!: Observable<boolean>;

  constructor(
    private timerService: TimerService,
    private store: Store,
    private localStore: LocalStorageService,
    public dialog: MatDialog
  ) {
    this.loginInfo = this.localStore.getLoginInfo();
  }

  ngOnInit(): void {
    // this.groups$ = this.store
    //   .select(selectGroupsInfo)
    //   .pipe(
    //     tap(res => {
    //       if (!res.Items.length) {
    //         this.store.dispatch(LoggedActions.getGroupsList());
    //       } else {
    //         this.groups = [...res.Items];
    //         this.groupsCount = res.Count;
    //       }
    //     })
    //   )
    //   .subscribe();
    this.timeNow$ = this.timerService.getCountdown();
    this.disabledBtn$ = this.timerService.getRunTimer();
  }

  // ngOnDestroy(): void {
  //   // this.groups$.unsubscribe();
  // }

  updateList() {
    this.timerService.startCountdown();
    this.store.dispatch(LoggedActions.getGroupsList());
  }

  createGroup() {
    this.dialog.open(GroupsFormComponent, { height: '300px', width: '400px' });
  }

  deleteGroup(id: string, title: string) {
    this.dialog.open(GroupDeleteComponent, {
      data: {
        groupTitle: title,
        groupId: id,
      },
      minHeight: '200px',
      width: '400px',
    });
  }
}
