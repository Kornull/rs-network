import { Component, OnInit } from '@angular/core';

import {
  FilterActivateService,
  SearchResultService,
  SortResultService,
} from 'src/app/core/services';

import { SearchItem, SortingTitle } from 'src/app/core/store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  cardsResult: SearchItem[] = [];

  constructor(
    private searchResultService: SearchResultService,
    private filterActivateService: FilterActivateService,
    private sortResultService: SortResultService
  ) {}

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    this.searchResultService
      .getItems()
      .subscribe(cards => (this.cardsResult = cards));
  }

  onFilterActivated(): boolean {
    return this.filterActivateService.getIsSearchRun();
  }

  onFilterByTitle(): string {
    return this.sortResultService.getSortingDirectionResult(
      SortingTitle.FILTER
    );
  }

  onSortingByDate(): string {
    return this.sortResultService.getSortingDirectionResult(SortingTitle.DATE);
  }

  onSortingByView() {
    return this.sortResultService.getSortingDirectionResult(SortingTitle.VIEW);
  }
}
