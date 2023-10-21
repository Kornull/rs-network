import { Component, Input } from '@angular/core';

import { FilterCommand } from 'src/app/models/types';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss'],
})
export class FilterListComponent {
  filterByTitle!: string;

  dateSortDirection: string = '';

  viewCountSortDirection: string = '';

  @Input() isUpdateSearch!: boolean;

  onSortDate(): void {
    if (this.viewCountSortDirection.length) this.viewCountSortDirection = '';
    if (!this.dateSortDirection.length) {
      this.dateSortDirection = FilterCommand.UP;
    } else if (this.dateSortDirection === FilterCommand.UP) {
      this.dateSortDirection = FilterCommand.DOWN;
    } else {
      this.dateSortDirection = FilterCommand.UP;
    }
  }

  onSortView(): void {
    if (this.dateSortDirection.length) this.dateSortDirection = '';
    if (!this.viewCountSortDirection.length) {
      this.viewCountSortDirection = FilterCommand.UP;
    } else if (this.viewCountSortDirection === FilterCommand.UP) {
      this.viewCountSortDirection = FilterCommand.DOWN;
    } else {
      this.viewCountSortDirection = FilterCommand.UP;
    }
  }
}
