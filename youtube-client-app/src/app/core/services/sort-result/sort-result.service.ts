import { Injectable } from '@angular/core';
import { FilterCommand, SortingDataType } from '../../store';

@Injectable({
  providedIn: 'root',
})
export class SortResultService {
  private sortData: SortingDataType = {
    filterByTitle: '',
    dateSortDirection: '',
    viewCountSortDirection: '',
  };

  clearSorting(): void {
    this.sortData.dateSortDirection = '';
    this.sortData.viewCountSortDirection = '';
  }

  setSortDate(): void {
    if (this.sortData.viewCountSortDirection.length) {
      this.sortData.viewCountSortDirection = '';
    }
    if (!this.sortData.dateSortDirection.length) {
      this.sortData.dateSortDirection = FilterCommand.UP;
    } else if (this.sortData.dateSortDirection === FilterCommand.UP) {
      this.sortData.dateSortDirection = FilterCommand.DOWN;
    } else {
      this.sortData.dateSortDirection = FilterCommand.UP;
    }
  }

  setSortView(): void {
    if (this.sortData.dateSortDirection.length) {
      this.sortData.dateSortDirection = '';
    }
    if (!this.sortData.viewCountSortDirection.length) {
      this.sortData.viewCountSortDirection = FilterCommand.UP;
    } else if (this.sortData.viewCountSortDirection === FilterCommand.UP) {
      this.sortData.viewCountSortDirection = FilterCommand.DOWN;
    } else {
      this.sortData.viewCountSortDirection = FilterCommand.UP;
    }
  }

  setTitleSort(searchTitleData: string): void {
    if (
      this.sortData.dateSortDirection.length ||
      this.sortData.viewCountSortDirection.length
    ) {
      this.clearSorting();
    }
    this.sortData.filterByTitle = searchTitleData;
  }

  getSortingData(): SortingDataType {
    return this.sortData;
  }
}
