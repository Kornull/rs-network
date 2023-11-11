import { Component } from '@angular/core';

import { SortResultService } from 'src/app/core/services';
import { SortingTitle } from 'src/app/core/store';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss'],
})
export class FilterListComponent {
  filterByTitle: string = '';

  constructor(private sortResultService: SortResultService) {}

  onSortDate(): void {
    this.sortResultService.setSortingData(SortingTitle.DATE);
  }

  onSortView(): void {
    this.sortResultService.setSortingData(SortingTitle.VIEW);
  }

  onTitleSort(): void {
    this.sortResultService.setTitleSort(this.filterByTitle);
  }

  getViewSortDirection(): string {
    return this.sortResultService.getSortingDirectionResult(SortingTitle.VIEW);
  }

  getDateSortDirection(): string {
    return this.sortResultService.getSortingDirectionResult(SortingTitle.DATE);
  }
}
