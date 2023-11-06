import { Component } from '@angular/core';

import { SortResultService } from 'src/app/core/services';
import { SortingDataType } from 'src/app/core/store';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss'],
})
export class FilterListComponent {
  filterByTitle: string = '';

  constructor(private sortResultService: SortResultService) {}

  onSortDate(): void {
    this.sortResultService.setSortDate();
  }

  onSortView(): void {
    this.sortResultService.setSortView();
  }

  onTitleSort(): void {
    this.sortResultService.setTitleSort(this.filterByTitle);
  }

  onResultSorting(): SortingDataType {
    return this.sortResultService.getSortingData();
  }
}
