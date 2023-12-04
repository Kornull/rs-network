import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { UpdateStoreService } from 'src/app/core/services';
import { Location } from '@angular/common';

import { CardDataType } from 'src/app/core/store';
import { cardsVideoActions } from 'src/app/core/store/redux';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card: CardDataType;

  constructor(
    private store: Store,
    private location: Location,
    private updateStore: UpdateStoreService
  ) {}

  getShortedDescription(descr: string): string {
    return descr.length > 252 ? `${descr.slice(0, 249)}...` : descr;
  }

  onLikedCard() {
    this.store.dispatch(
      cardsVideoActions.addFavoriteCard({ likedCardId: this.card.key })
    );
  }

  removeCustomCard() {
    this.updateStore.deleteCustomCard(this.card.key);
    this.location.back();
  }
}
