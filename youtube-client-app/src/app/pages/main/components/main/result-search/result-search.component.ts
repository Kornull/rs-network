import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SharedModule } from 'src/app/shared';
import { CardDataType } from 'src/app/core/store';
import {
  CardsVideoActions,
  selectGetCountPages,
  selectGetPageNow,
} from 'src/app/core/store/redux';
import { ResultItemComponent } from '../result-item/result-item.component';

@Component({
  selector: 'app-result-search',
  standalone: true,
  imports: [CommonModule, ResultItemComponent, SharedModule],
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.scss'],
})
export class ResultSearchComponent implements OnInit {
  @Input() searchResult: CardDataType[];

  pages$: Observable<number>;

  pages: number;

  pageNow$: Observable<number>;

  pageNow: number;

  constructor(private store: Store) {
    this.pages$ = this.store.select(selectGetCountPages);
    this.pageNow$ = this.store.select(selectGetPageNow);
  }

  ngOnInit(): void {
    this.pages$.subscribe(pages => (this.pages = pages));
    this.pageNow$.subscribe(page => (this.pageNow = page));
  }

  getLeftBtnIsDisabled(): boolean {
    return this.pageNow === 1;
  }

  getRightBtnIsDisabled(): boolean {
    return this.pageNow === this.pages;
  }

  onClickNexPage() {
    this.pageNow += 1;
    this.store.dispatch(
      CardsVideoActions.updateCurrentPage({
        pageNow: this.pageNow,
      })
    );
  }

  onClickPrevPage() {
    this.pageNow -= 1;
    this.store.dispatch(
      CardsVideoActions.updateCurrentPage({
        pageNow: this.pageNow,
      })
    );
  }
}
