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
} from 'src/app/core/services';

import {
  CardDataType,
  SearchItemDetails,
  SortingTitle,
} from 'src/app/core/store';
import {
  CardVideoActions,
  selectAllVideoList,
  init,
} from 'src/app/core/store/redux';

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
    private store: Store
  ) {
    this.cardsResult$ = this.store.select(selectAllVideoList);
  }

  ngOnInit(): void {
    this.store.dispatch(init());
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
        this.store.dispatch(
          CardVideoActions.addYoutubeCards({
            youtubeCards: data.map((card: SearchItemDetails) => {
              return {
                cardDetail: {
                  title: card.snippet.title,
                  subTitle: card.snippet.localized.title,
                  imageLink: card.snippet.thumbnails.default.url,
                  videoLink: '',
                  date: card.snippet.publishedAt,
                  description: card.snippet.localized.description,
                  tags: card.snippet.tags,
                  statistics: card.statistics,
                },
                id: card.id,
                liked: false,
              };
            }),
          })
        );
      });
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
