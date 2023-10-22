import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CardsListComponent } from 'src/app/components/cards-list/cards-list.component';

import { SearchItem } from 'src/app/models/search-item.model';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, CardsListComponent],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  @Input() searchCardsResult: SearchItem[];
}
