import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs';

import {
  SearchResultService,
  SearchValueService,
  SortResultService,
  UpdateStoreService,
} from 'src/app/core/services';

import { CardDataType, SortingTitle } from 'src/app/core/store';
import { selectGetCards } from 'src/app/core/store/redux';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  cardsResult: CardDataType[] = [];

  cardsResult$: Observable<CardDataType[]>;

  constructor(
    private searchResultService: SearchResultService,
    private searchValueService: SearchValueService,
    private sortResultService: SortResultService,
    private updateStore: UpdateStoreService,
    private store: Store
  ) {
    this.cardsResult$ = this.store.select(selectGetCards);
  }

  ngOnInit(): void {
    this.searchValueService
      .getSearchValue()
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter(search => search.length > 2),
        switchMap(data => {
          return this.searchResultService.fetchCards(data);
        })
      )
      .subscribe(data => {
        this.updateStore.addYoutubeCardToStore(data);
      });
  }

  isLinkUrl(link: string | undefined): string {
    return link !== undefined ? link : './assets/image-not-found.jpg';
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
