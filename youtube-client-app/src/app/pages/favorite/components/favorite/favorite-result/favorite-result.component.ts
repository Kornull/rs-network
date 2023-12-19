import { Component, Input } from '@angular/core';

import { CardDataType } from 'src/app/core/store';

@Component({
  selector: 'app-favorite-result',
  templateUrl: './favorite-result.component.html',
  styleUrls: ['./favorite-result.component.scss'],
})
export class FavoriteResultComponent {
  @Input() favoriteCards: CardDataType[];
}
