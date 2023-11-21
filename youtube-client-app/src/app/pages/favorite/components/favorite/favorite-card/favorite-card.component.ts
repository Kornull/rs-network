import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardDataType } from 'src/app/core/store';
import { CardsVideoActions } from 'src/app/core/store/redux';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss'],
})
export class FavoriteCardComponent {
  @Input() card: CardDataType;

  constructor(private store: Store) {}

  getShortDescription(descr: string): string {
    return descr.length > 39 ? `${descr.slice(0, 33)}...` : descr;
  }

  getShortTitle(title: string): string {
    return title.length > 25 ? `${title.slice(0, 22)}...` : title;
  }

  onLikeCard() {
    this.store.dispatch(
      CardsVideoActions.addFavoriteCard({ likedCardId: this.card.key })
    );
  }
}
