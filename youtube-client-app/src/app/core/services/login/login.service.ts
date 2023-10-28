import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLogged: boolean = false;

  getLog(): boolean {
    return this.isLogged;
  }
}
