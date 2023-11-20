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
import { CardsVideoActions } from '../../store/redux';

@Injectable({
  providedIn: 'root',
})
export class SearchResultService {
  private searchTitle: string = 'search?type=video&part=snippet&maxResults=20&';

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

  private addYoutubeKeyToStore() {}

  private addCardsToStore(data: SearchItemDetails[]): void {
    data.forEach((card: SearchItemDetails) => {
      this.store.dispatch(
        CardsVideoActions.addYoutubeCard({
          youtubeCard: {
            value: {
              title: card.snippet.title,
              subTitle: card.snippet.localized.title,
              imageLink: card.snippet.thumbnails.medium.url,
              videoLink: '',
              date: card.snippet.publishedAt,
              description: card.snippet.localized.description,
              tags: card.snippet.tags,
              statistics: card.statistics,
            },
            key: card.id,
            liked: false,
            deleteBtn: false,
          },
        })
      );
    });
  }

  fetchCards(searchValue: string): Observable<SearchItemDetails[]> {
    return this.http
      .get<SearchResponseDefault>(`${this.searchTitle}q=${searchValue}`)
      .pipe(
        map((data: SearchResponseDefault): SearchItemDefault[] => data.items),
        mergeMap(data => {
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

  setShowSearchResult() {
    this.isShowResultSearch = true;
  }
}
