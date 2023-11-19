import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  FilterActivateService,
  FilterOpenedService,
  LoginService,
  SearchValueService,
} from 'src/app/core/services';

import { DefaultDataCustomBtn } from 'src/app/core/store/models/types';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss'],
})
export class HeaderSearchComponent implements OnInit {
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
    private searchValueService: SearchValueService
  ) {}

  ngOnInit(): void {
    this.searchValueService.getSearchValue().subscribe(value => {
      this.inputValue = value;
    });
  }

  onSearch(val: string): void {
    this.searchValueService.setValue(val);

    this.filterActivateService.activatedFilter(this.inputValue);
    this.onRedirectToHome();
  }

  onBtnDisabled(): boolean {
    this.filterActivateService.activatedFilter(this.inputValue);
    return this.filterActivateService.getIsBtnDisabled();
  }

  onChangeFilterBtnStatus(): boolean {
    return this.filterOpenedService.changeFilterStatus();
  }

  onRedirectToHome() {
    this.router.navigate(['/']);
  }
}
