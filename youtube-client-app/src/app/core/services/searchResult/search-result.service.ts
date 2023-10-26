import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SearchMockData } from 'src/app/mock/mock-response';
import { SearchItem } from '../../store';

@Injectable({
  providedIn: 'root',
})
export class SearchResultService {
  getItems(): Observable<SearchItem[]> {
    const resultCards: SearchItem[] = [...SearchMockData.items];
    const cards: Observable<SearchItem[]> = of(resultCards);
    return cards;
  }
}
