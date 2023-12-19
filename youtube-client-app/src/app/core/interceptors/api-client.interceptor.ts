import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { youtubeApiLink } from 'src/app/shared/constants';

@Injectable()
export class ApiClientInterceptor implements HttpInterceptor {
  private key: string = 'AIzaSyCjxYWuc-qybp6xsnbLr9zezCzaqvtWgvo';

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const params = new HttpParams().set('key', this.key);

    const requestUrl = request.clone({
      url: ` ${youtubeApiLink}${request.url}`,
      params,
    });

    return next.handle(requestUrl).pipe(retry(1));
  }
}
