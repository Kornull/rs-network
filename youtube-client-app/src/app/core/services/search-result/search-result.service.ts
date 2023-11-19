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
import { CardVideoActions, setAllVideos } from '../../store/redux';

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

  fetchCards(searchValue: string): Observable<SearchItemDetails[]> {
    return this.http
      .get<SearchResponseDefault>(`${this.searchTitle}q=${searchValue}`)
      .pipe(
        map((data: SearchResponseDefault): SearchItemDefault[] => data.items),
        mergeMap(data => {
          const idLine: string = data
            .map((item: SearchItemDefault): string => item.id.videoId)
            .join(',');
          return this.http
            .get<SearchResponseDetails>(`${this.searchId}id=${idLine}`)
            .pipe(
              map((cardsList: SearchResponseDetails): SearchItemDetails[] => {
                this.store.dispatch(
                  CardVideoActions.addYoutubeCards({
                    youtubeCards: cardsList.items.map(
                      (card: SearchItemDetails) => {
                        return {
                          cardDetail: {
                            title: card.snippet.title,
                            subTitle: card.snippet.localized.title,
                            imageLink: card.snippet.thumbnails.default.url,
                            videoLink: '',
                            date: card.snippet.publishedAt,
                            description: card.snippet.localized.description,
                            tags: card.snippet.tags,
                            statistics: card.statistics,
                          },
                          id: card.id,
                          liked: false,
                        };
                      }
                    ),
                  })
                );
                this.store.dispatch(setAllVideos());
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

  getCards(): Observable<SearchItemDetails[]> {
    return this.cardsResult$;
  }

  getCard(idCard: string): Observable<SearchItemDetails> {
    return this.http
      .get<SearchResponseDetails>(`${this.searchId}id=${idCard}`)
      .pipe(map(card => card.items[0]));
  }

  setShowSearchResult() {
    this.isShowResultSearch = true;
  }
}
