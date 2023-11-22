import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UpdateStoreService } from 'src/app/core/services';
import { CardDataType } from 'src/app/core/store';
import { CardsVideoActions } from 'src/app/core/store/redux';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent {
  @Input() card: CardDataType;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private updateStore: UpdateStoreService
  ) {}

  onRunTo() {
    this.router.navigate([`main/about/${this.card.key}`]);
  }

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

  removeCustomCard() {
    this.updateStore.deleteCustomCard(this.card.key);
  }
}
