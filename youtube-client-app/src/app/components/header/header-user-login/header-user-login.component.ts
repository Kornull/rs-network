import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DefaultDataCustomBtn } from 'src/app/models/default-data-custom-btn.model';

@Component({
  selector: 'app-header-user-login',
  templateUrl: './header-user-login.component.html',
  styleUrls: ['./header-user-login.component.scss'],
})
export class HeaderUserLoginComponent {
  userBtnStyle: string = DefaultDataCustomBtn.USER;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'userLogo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/user-logo.svg')
    );
  }
}
