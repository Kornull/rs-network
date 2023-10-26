import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FilterCommand } from 'src/app/core/store/models/types';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss'],
})
export class FilterListComponent {
  @Input() filterByTitle: string;

  @Input() dateSortDirection: string = '';

  @Input() viewCountSortDirection: string = '';

  @Output() dateCardsSort = new EventEmitter<string>();

  @Output() viewCardsSort = new EventEmitter<string>();

  @Output() titleCardsSort = new EventEmitter<string>();

  private updateSort(): void {
    this.dateCardsSort.emit(this.dateSortDirection);
    this.viewCardsSort.emit(this.viewCountSortDirection);
  }

  onSortDate(): void {
    if (this.viewCountSortDirection.length) this.viewCountSortDirection = '';
    if (!this.dateSortDirection.length) {
      this.dateSortDirection = FilterCommand.UP;
    } else if (this.dateSortDirection === FilterCommand.UP) {
      this.dateSortDirection = FilterCommand.DOWN;
    } else {
      this.dateSortDirection = FilterCommand.UP;
    }
    this.updateSort();
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
    this.updateSort();
  }

  onTitleSort(): void {
    this.dateSortDirection = '';
    this.viewCountSortDirection = '';
    if (this.filterByTitle.trim()) {
      this.titleCardsSort.emit(this.filterByTitle);
    } else {
      this.titleCardsSort.emit('');
    }

    this.updateSort();
  }
}
