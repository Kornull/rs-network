import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable,
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

import { CardDataType, SortingTitle } from 'src/app/core/store';
import { allVideoListSelector, init } from 'src/app/core/store/redux';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  cardsResult: CardDataType[] = [];

  destr$: Observable<CardDataType[]>;

  constructor(
    private searchResultService: SearchResultService,
    private searchValueService: SearchValueService,
    private sortResultService: SortResultService,
    private store: Store
  ) {
    this.destr$ = this.store.select(allVideoListSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(init());
    this.searchValueService
      .getSearchValue()
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter(searchData => searchData.length > 2),
        tap((searchData: string) => {
          this.searchResultService.fetchCards(searchData).subscribe();
        })
      )
      .subscribe();
    this.destr$.subscribe(data => (this.cardsResult = [...data]));
    takeUntil(this.destroy$);
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
