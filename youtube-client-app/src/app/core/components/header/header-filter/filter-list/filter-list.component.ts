import { Component } from '@angular/core';
import { SortResultService } from 'src/app/core/services/sortResult/sort-result.service';
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
    if (this.filterByTitle.length) this.clearFilterByTitle();
  }

  onSortView(): void {
    this.sortResultService.setSortView();
    if (this.filterByTitle.length) this.clearFilterByTitle();
  }

  onTitleSort(): void {
    this.sortResultService.setTitleSort(this.filterByTitle);
  }

  onResultSorting(): SortingDataType {
    return this.sortResultService.getSortingData();
  }

  clearFilterByTitle(): void {
    this.filterByTitle = '';
  }
}
