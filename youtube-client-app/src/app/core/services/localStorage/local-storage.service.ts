import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserData } from '../../store';
import { FilterActivateService } from '../filter-activate/filter-activate.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(
    private route: Router,
    private filterActivateService: FilterActivateService
  ) {}

  createFakeToken() {
    const firsPart = Math.random().toString(36).substr(2);
    const secondPart = Math.random().toString(36).substr(2);

    localStorage.setItem('user-fake-youtube-token', `${firsPart}${secondPart}`);
    this.route.navigate(['/main']);
    return `${firsPart}${secondPart}`;
  }

  addUserLocalStore({ email }: UserData) {
    localStorage.setItem('youtube-user-login', email);
    this.createFakeToken();
  }

  getToken(): string | null {
    const token: string | null = localStorage.getItem(
      'user-fake-youtube-token'
    );
    return token;
  }

  removeToken() {
    this.filterActivateService.turnOffBtn();
    this.route.navigate(['/auth']);
    localStorage.clear();
  }
}
