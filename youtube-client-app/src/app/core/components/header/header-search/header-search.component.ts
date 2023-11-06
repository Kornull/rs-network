import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import {
  FilterActivateService,
  FilterOpenedService,
  LoginService,
} from 'src/app/core/services';

import { DefaultDataCustomBtn } from 'src/app/core/store/models/types';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss'],
})
export class HeaderSearchComponent {
  isBtnDisabled: boolean = true;

  isViewFilter: boolean = false;

  searchBtnStyle: string = DefaultDataCustomBtn.SEARCH;

  settingsBtnStyle: string = DefaultDataCustomBtn.SETTINGS;

  inputValue: string = '';

  constructor(
    public loginService: LoginService,
    private router: Router,
    private filterActivateService: FilterActivateService,
    private filterOpenedService: FilterOpenedService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'logoIcon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/logo.svg')
    );
    iconRegistry.addSvgIcon(
      'settings',
      sanitizer.bypassSecurityTrustResourceUrl('assets/settings.svg')
    );
  }

  onSearch(): void {
    this.filterActivateService.activatedFilter(this.inputValue);
    this.inputValue = '';
    this.onRedirectToHome();
  }

  onBtnDisabled(): boolean {
    return this.filterActivateService.getIsBtnDisabled();
  }

  onChangeFilterBtnStatus(): boolean {
    return this.filterOpenedService.changeFilterStatus();
  }

  onRedirectToHome() {
    this.router.navigate(['/']);
  }
}
