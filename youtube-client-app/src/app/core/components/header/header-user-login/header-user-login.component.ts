import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { LocalStorageService, LoginService } from 'src/app/core/services';
import { DefaultDataCustomBtn } from 'src/app/core/store';

@Component({
  selector: 'app-header-user-login',
  templateUrl: './header-user-login.component.html',
  styleUrls: ['./header-user-login.component.scss'],
})
export class HeaderUserLoginComponent {
  userBtnStyle: string = DefaultDataCustomBtn.USER;

  constructor(
    private localStorageService: LocalStorageService,
    public loginService: LoginService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'userLogo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/user-logo.svg')
    );
  }

  onLogOut() {
    this.localStorageService.removeToken();
  }
}
