import { Component, Input } from '@angular/core';

import { DefaultDataCustomBtn } from 'src/app/models/types';

import { SearchItem } from 'src/app/models/search-item.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card!: SearchItem;

  cardStyle: string = DefaultDataCustomBtn.DEFAULT;
}
