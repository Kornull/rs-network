import { Component } from '@angular/core';

import { SearchItem } from 'src/app/models/search-item.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  searchResults!: SearchItem[];
}
