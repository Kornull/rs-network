import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';

import { GROUPS } from './groups';
import { GroupsData } from '../../../../core/store/models';
import { TimerService } from '../../../../core/services';

@Component({
  selector: 'app-main-groups',
  standalone: true,
  imports: [MatButtonModule, AsyncPipe],
  templateUrl: './main-groups.component.html',
  styleUrl: './main-groups.component.scss',
})
export class MainGroupsComponent implements OnInit {
  groups: GroupsData = GROUPS;

  timeNow$!: Observable<number>;

  disabledBtn$!: Observable<boolean>;

  seconds = 60;

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.timeNow$ = this.timerService.getCountdown();
    this.disabledBtn$ = this.timerService.getRunTimer();
  }

  updateList() {
    this.timerService.startCountdown();
  }
}
