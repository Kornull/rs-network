import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil,
  tap,
} from 'rxjs';

import {
  SearchResultService,
  SearchValueService,
  SortResultService,
} from 'src/app/core/services';

import { SearchItemDetails, SortingTitle } from 'src/app/core/store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  cardsResult: SearchItemDetails[] = [];

  constructor(
    private searchResultService: SearchResultService,
    private searchValueService: SearchValueService,
    private sortResultService: SortResultService
  ) {}

  ngOnInit(): void {
    this.searchValueService
      .getSearchValue()
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter(searchData => searchData.length > 2),
        tap((searchData: string) => {
          this.searchResultService
            .fetchCards(searchData)
            .subscribe(cards => (this.cardsResult = [...cards]));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchResultView(): boolean {
    if (this.cardsResult.length) {
      return this.searchResultService.isShowResultSearch;
    }
    return false;
  }

  onFilterByTitle(): string {
    return this.sortResultService.getSortingDirectionResult(
      SortingTitle.FILTER
    );
  }

  onSortingByDate(): string {
    return this.sortResultService.getSortingDirectionResult(SortingTitle.DATE);
  }

  onSortingByView(): string {
    return this.sortResultService.getSortingDirectionResult(SortingTitle.VIEW);
  }
}
