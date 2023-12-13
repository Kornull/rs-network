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
  private userDataLogged: UserRegisterData | null;

  private token: string = '';

  private id: string = '';

  private mail: string = '';

  constructor(private localStore: LocalStorageService) {
    this.userDataLogged = this.localStore.getLoginInfo();
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.id = this.userDataLogged?.uid || '';
    this.mail = this.userDataLogged?.email || '';
    this.token = this.userDataLogged?.token || '';

    const requestUrl = request.clone({
      url: `${RequestsData.PROFILE}`,
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'rs-uid': this.id,
        'rs-email': this.mail,
      },
    });

    return next.handle(requestUrl).pipe(retry(1));
  }
}
