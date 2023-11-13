import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, mergeMap, shareReplay } from 'rxjs';

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

  private cardDetails: SearchItemDetails;

  public isShowResultSearch: boolean = false;

  constructor(private http: HttpClient) {}

  fetchCards(searchValue: string): void {
    this.cardsResult$ = this.http
      .get<SearchResponseDefault>(
        `search?type=video&part=snippet&maxResults=16&q=${searchValue}`
      )
      .pipe(
        map((data: SearchResponseDefault): SearchItemDefault[] => data.items),
        mergeMap(data => {
          const idLine: string = data
            .map((item: SearchItemDefault): string => item.id.videoId)
            .join(',');
          return this.http
            .get<SearchResponseDetails>(
              `videos?id=${idLine}&part=snippet,statistics`
            )
            .pipe(
              map(
                (cardsList: SearchResponseDetails): SearchItemDetails[] =>
                  cardsList.items
              )
            );
        }),
        shareReplay(),
        catchError((err: HttpErrorResponse) => {
          console.error('Error: ', err);
          return [];
        })
      );
  }

  getCards(): Observable<SearchItemDetails[]> {
    return this.cardsResult$;
  }

  getCard(idCard: string): SearchItemDetails {
    this.cardsResult$.subscribe(cards => {
      cards.forEach(card => {
        if (card.id === idCard) this.cardDetails = card;
      });
    });
    return this.cardDetails;
  }

  setShowSearchResult() {
    this.isShowResultSearch = true;
  }
}
