import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { RequestsData, UserRegisterData } from '../store/models';
import { LocalStorageService } from '../services';

@Injectable()
export class ProfileDataInterceptor implements HttpInterceptor {
  private userDataLogged!: UserRegisterData | null;

  private token: string = '';

  private id: string = '';

  private mail: string = '';

  constructor(private localStore: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.userDataLogged = this.localStore.getLoginInfo();

    if (request.url.includes(RequestsData.REGISTER)) {
      return next.handle(request);
    }
    if (request.url.includes(RequestsData.LOGIN)) {
      return next.handle(request);
    }

    this.token = this.userDataLogged?.token || '';
    this.id = this.userDataLogged?.uid || '';
    this.mail = this.userDataLogged?.email || '';
    const requestUrl = request.clone({
      url: `${request.url}`,
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'rs-uid': this.id,
        'rs-email': this.mail,
      },
    });
    return next.handle(requestUrl).pipe(retry(0));
  }
}
