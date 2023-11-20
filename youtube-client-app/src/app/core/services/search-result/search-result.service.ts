import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, mergeMap, shareReplay } from 'rxjs';

import { Store } from '@ngrx/store';
import {
  SearchItemDefault,
  SearchItemDetails,
  SearchResponseDefault,
  SearchResponseDetails,
} from '../../store';

@Injectable({
  providedIn: 'root',
})
export class SearchResultService {
  private cardsResult$: Observable<SearchItemDetails[]>;

  private searchTitle: string = 'search?type=video&part=snippet&maxResults=16&';

  private searchId: string = 'videos?part=snippet,statistics&';

  public isShowResultSearch: boolean = false;

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  getCardIdsByString(data: SearchItemDefault[]) {
    return data
      .map((item: SearchItemDefault): string => item.id.videoId)
      .join(',');
  }

  fetchCards(searchValue: string): Observable<SearchItemDetails[]> {
    return this.http
      .get<SearchResponseDefault>(`${this.searchTitle}q=${searchValue}`)
      .pipe(
        map((data: SearchResponseDefault): SearchItemDefault[] => data.items),
        mergeMap(data => {
          console.log('DAta', data);
          return this.http
            .get<SearchResponseDetails>(
              `${this.searchId}id=${this.getCardIdsByString(data)}`
            )
            .pipe(
              map((cardsList: SearchResponseDetails): SearchItemDetails[] => {
                return cardsList.items;
              })
            );
        }),
        shareReplay(),
        catchError((err: HttpErrorResponse) => {
          console.error('Error: ', err);
          return [];
        })
      );
  }

  // getCards(): Observable<SearchItemDetails[]> {
  //   return this.cardsResult$;
  // }

  // getCard(idCard: string): Observable<SearchItemDetails> {
  //   return this.http
  //     .get<SearchResponseDetails>(`${this.searchId}id=${idCard}`)
  //     .pipe(map(card => card.items[0]));
  // }

  setShowSearchResult() {
    this.isShowResultSearch = true;
  }
}
