import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CardComponent } from './card/card.component';

import { SearchItem } from '../../models/search-item.model';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent {
  @Input() cardsResult: SearchItem[];
}
