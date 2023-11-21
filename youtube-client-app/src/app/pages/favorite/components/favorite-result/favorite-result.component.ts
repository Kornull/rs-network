import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CardDataType } from 'src/app/core/store';
import { selectLikedCards } from 'src/app/core/store/redux';

@Component({
  selector: 'app-favorite-result',
  templateUrl: './favorite-result.component.html',
  styleUrls: ['./favorite-result.component.scss'],
})
export class FavoriteResultComponent {
  favoriteResult$: Observable<CardDataType[]>;

  favoriteResult: CardDataType;

  constructor(private store: Store) {
    this.favoriteResult$ = this.store.select(selectLikedCards);
  }
}
