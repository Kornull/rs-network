import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FilterOpenedService, SortResultService } from 'src/app/core/services';
import { CardDataType, SortingTitle } from 'src/app/core/store';
import { selectGetLikedCards } from 'src/app/core/store/redux';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  favoriteResult$: Observable<CardDataType[]>;

  favoriteResult: CardDataType[];

  constructor(
    private store: Store,
    private sortService: SortResultService,
    private openedFilter: FilterOpenedService
  ) {}

  ngOnInit(): void {
    this.sortService.resetSort();
    this.openedFilter.closeFilter();
    this.favoriteResult$ = this.store.select(selectGetLikedCards);
    this.favoriteResult$.subscribe(cards => (this.favoriteResult = cards));
  }

  onFilterByTitle(): string {
    return this.sortService.getSortingDirectionResult(SortingTitle.FILTER);
  }

  onSortingByDate(): string {
    return this.sortService.getSortingDirectionResult(SortingTitle.DATE);
  }

  onSortingByView(): string {
    return this.sortService.getSortingDirectionResult(SortingTitle.VIEW);
  }
}
