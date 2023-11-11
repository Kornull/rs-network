import { Injectable } from '@angular/core';

import { FilterCommand, SortingTitle } from '../../store';

@Injectable({
  providedIn: 'root',
})
export class SortResultService {
  private filterByTitle: string = '';

  private dateSortDirection: string = '';

  private viewCountSortDirection: string = '';

  private getSortingDirection(value: string): string {
    if (!value) {
      return FilterCommand.UP;
    }
    if (value === FilterCommand.UP) {
      return FilterCommand.DOWN;
    }
    return FilterCommand.UP;
  }

  private clearSorting(): void {
    this.dateSortDirection = '';
    this.viewCountSortDirection = '';
  }

  setTitleSort(searchTitleData: string): void {
    if (this.dateSortDirection || this.viewCountSortDirection) {
      this.clearSorting();
    }
    this.filterByTitle = searchTitleData;
  }

  getSortingDirectionResult(value: string): string {
    switch (value) {
      case SortingTitle.VIEW:
        return this.viewCountSortDirection;
      case SortingTitle.DATE:
        return this.dateSortDirection;
      case SortingTitle.FILTER:
        return this.filterByTitle;
      default:
        return '';
    }
  }

  setSortingData(value: string): void {
    switch (value) {
      case SortingTitle.DATE:
        if (this.viewCountSortDirection) {
          this.viewCountSortDirection = '';
        }
        this.dateSortDirection = this.getSortingDirection(
          this.dateSortDirection
        );
        break;
      case SortingTitle.VIEW:
        if (this.dateSortDirection) {
          this.dateSortDirection = '';
        }
        this.viewCountSortDirection = this.getSortingDirection(
          this.viewCountSortDirection
        );
        break;
      default:
        break;
    }
  }

  resetSort(): void {
    this.clearSorting();
    this.filterByTitle = '';
  }
}
