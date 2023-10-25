import { Component,EventEmitter,Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { DefaultDataCustomBtn } from 'src/app/core/store/models/types';
import { SearchItem } from 'src/app/core/store/models/search-item.model';
import { SearchMockData } from 'src/app/mock/mock-response';
import {
  FilterActivateService,
  FilterOpenedService,
} from 'src/app/core/services';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss'],
})
export class HeaderSearchComponent {
  @Output() isOpenFilter = new EventEmitter<boolean>();

  @Output() isViewSearchResults = new EventEmitter<boolean>();

  @Output() resultItemList = new EventEmitter<SearchItem[]>();

  isBtnDisabled: boolean = true;

  isViewFilter: boolean = false;

  resultSearch: SearchItem[] = [...SearchMockData.items];

  searchBtnStyle: string = DefaultDataCustomBtn.SEARCH;

  settingsBtnStyle: string = DefaultDataCustomBtn.SETTINGS;

  inputValue: string = '';

  constructor(
    private filterActivate: FilterActivateService,
    private openingFilter: FilterOpenedService,
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
    this.filterActivate.activatedFilter(this.inputValue);
    this.inputValue = '';
  }

  onBtnDisabled(): boolean {
    return this.filterActivate.getIsBtnDisabled();
  }

  onChangeFilterBtnStatus(): boolean {
    return this.openingFilter.changeFilterStatus();
  }
}
