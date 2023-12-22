import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export default class ClearStoreService {
  constructor(private rooter: Router) {}

  clearUserStorage() {
    this.deleteCookie();
    localStorage.clear();
    sessionStorage.clear();
    this.rooter.navigate(['']);
  }

  deleteCookie() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  }
}
