import { Component, OnInit } from '@angular/core';
import { FilterOpenedService, SortResultService } from 'src/app/core/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(
    private sortService: SortResultService,
    private openedFilter: FilterOpenedService
  ) {}

  ngOnInit(): void {
    this.sortService.resetSort();
    this.openedFilter.closeFilter();
  }
}
