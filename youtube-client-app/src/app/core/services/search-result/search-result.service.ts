import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, mergeMap, shareReplay } from 'rxjs';

import { SearchItem, SearchResponse } from '../../store';

@Injectable({
  providedIn: 'root',
})
export class SearchResultService {
  private cardsResult$: Observable<SearchItem[]>;

  public isShowResultSearch: boolean = false;

  constructor(private http: HttpClient) {}

  fetchCards(searchValue: string): void {
    this.cardsResult$ = this.http
      .get<SearchResponse>(
        `search?type=video&part=snippet&maxResults=16&q=${searchValue}`
      )
      .pipe(
        map((data: SearchResponse): SearchItem[] => {
          return data.items;
        }),
        mergeMap(data => {
          const idLine: string = data
            .map((item: SearchItem): string => item.id.videoId)
            .join(',');
          return this.http
            .get<SearchResponse>(`videos?id=${idLine}&part=snippet,statistics`)
            .pipe(
              map((cardsList: SearchResponse): SearchItem[] => cardsList.items)
            );
        }),
        shareReplay(),
        catchError((err: HttpErrorResponse) => {
          console.error('Error: ', err);
          return [];
        })
      );
  }

  getCards(): Observable<SearchItem[]> {
    return this.cardsResult$;
  }

  setShowSearchResult() {
    this.isShowResultSearch = true;
  }
}
