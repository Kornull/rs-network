import { Injectable } from '@angular/core';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { UserData } from '../../store';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user: UserData = {
    login: localStorage.getItem('youtube-user-login') || '',
    password: '',
  };

  constructor(private localStorageService: LocalStorageService) {}

  createUser({ login, password }: UserData) {
    this.user = {
      login,
      password,
    };
  }

  getLog(): boolean {
    if (this.localStorageService.getToken()) {
      return true;
    }
    return false;
  }

  getUserLogin() {
    if (this.getLog())
      return this.user.login.length > 8
        ? `${this.user.login.slice(0, 5)}...`
        : this.user.login;
    return 'Your Name';
  }
}
