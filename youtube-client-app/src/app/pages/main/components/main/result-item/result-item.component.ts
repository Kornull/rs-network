import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CardDataType } from 'src/app/core/store';
import { SharedModule } from 'src/app/shared';
import { Store } from '@ngrx/store';
import { CardsVideoActions } from 'src/app/core/store/redux';
import { UpdateStoreService } from 'src/app/core/services';

@Component({
  selector: 'app-result-item',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    SharedModule,
  ],
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss'],
})
export class ResultItemComponent {
  @Input() card: CardDataType;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private updateStore: UpdateStoreService
  ) {}

  onRunTo() {
    this.router.navigate([`about/${this.card.key}`], {
      relativeTo: this.route,
    });
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
    this.updateStore.removeCustomCard(this.card.key);
  }
}
