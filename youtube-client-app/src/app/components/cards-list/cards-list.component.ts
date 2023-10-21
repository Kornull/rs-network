import { Component, Input } from '@angular/core';

import { SearchItem } from 'src/app/models/search-item.model';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent {
  @Input() searchCardsResult: SearchItem[];
}
