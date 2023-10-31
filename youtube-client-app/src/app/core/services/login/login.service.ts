import { Injectable } from '@angular/core';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private localStorageService: LocalStorageService) {}

  getLog(): boolean {
    if (this.localStorageService.getToken()) {
      return true;
    }
    return false;
  }
}
