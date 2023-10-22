import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-cards',
  templateUrl: './filter-cards.component.html',
  styleUrls: ['./filter-cards.component.scss'],
})
export class FilterCardsComponent {
  @Input() titleFilter: string;

  @Input() dateSort: string;

  @Input() viewSort: string;

  @Output() updateViewSort = new EventEmitter<string>();

  @Output() updateDateSort = new EventEmitter<string>();

  @Output() updateTitleSort = new EventEmitter<string>();

  onUpdateDateSort(date: string): void {
    this.updateDateSort.emit(date);
  }

  onUpdateViewSort(view: string): void {
    this.updateViewSort.emit(view);
  }

  onUpdateTitleSort(title: string): void {
    this.updateTitleSort.emit(title);
  }
}
