import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SearchItem } from '../../store';
import { SearchMockData } from '../../mock/mock-response';

@Injectable({
  providedIn: 'root',
})
export class SearchResultService {
  getItems(): Observable<SearchItem[]> {
    const resultCards: SearchItem[] = [...SearchMockData.items];
    const cards: Observable<SearchItem[]> = of(resultCards);
    return cards;
  }

  getItem(id: string): SearchItem | null {
    const result = SearchMockData.items.find((el: SearchItem) => el.id === id);
    if (result) return result;

    return null;
  }
}
