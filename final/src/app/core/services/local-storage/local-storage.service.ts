import { Injectable } from '@angular/core';
import { LocalStoreKeys, UserRegisterData } from '../../store/models';

@Injectable({
  providedIn: 'root',
})
export default class LocalStorageService {
  loginSuccess(data: UserRegisterData) {
    localStorage.setItem(LocalStoreKeys.AUTH_USER, JSON.stringify(data));
  }

  getLoginInfo(): UserRegisterData | null {
    const info = localStorage.getItem(LocalStoreKeys.AUTH_USER);
    const result = info !== null ? JSON.parse(info) : null;

    return result;
  }

  getThemeApp(): string | null {
    const info = localStorage.getItem(LocalStoreKeys.THEME) || null;
    const result = info !== null ? JSON.parse(info) : null;

    return result;
  }

  getInvalidEmails(): string[] | null {
    const info = localStorage.getItem(LocalStoreKeys.INVALID_EMAIL);
    const result = info !== null ? JSON.parse(info) : null;

    return result;
  }

  setInvalidEmails(data: string[]) {
    localStorage.setItem(LocalStoreKeys.INVALID_EMAIL, JSON.stringify(data));
  }

  setThemeApp(data: string) {
    localStorage.setItem(LocalStoreKeys.THEME, JSON.stringify(data));
  }
}
