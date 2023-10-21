import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { DefaultDataCustomBtn } from 'src/app/models/types';
import { SearchItem } from 'src/app/models/search-item.model';
import { SearchMockData } from 'src/app/mock/mock-response';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss'],
})
export class HeaderSearchComponent {
  @Output() isOpenFilter = new EventEmitter<boolean>();

  @Output() isViewSearchResults = new EventEmitter<boolean>();

  @Output() resultItemList = new EventEmitter<SearchItem[]>();

  isSearchDone: boolean = true;

  isViewFilter: boolean = false;

  resultSearch: SearchItem[] = [...SearchMockData.items];

  searchBtnStyle: string = DefaultDataCustomBtn.SEARCH;

  settingsBtnStyle: string = DefaultDataCustomBtn.SETTINGS;

  inputValue: string = '';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'logoIcon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/logo.svg')
    );
    iconRegistry.addSvgIcon(
      'settings',
      sanitizer.bypassSecurityTrustResourceUrl('assets/settings.svg')
    );
  }

  onViewFilter() {
    if (!this.isSearchDone) {
      this.isViewFilter = !this.isViewFilter;
      this.isOpenFilter.emit(this.isViewFilter);
    }
  }

  onSearch() {
    if (this.inputValue.trim().length) {
      this.isSearchDone = false;
      this.isViewSearchResults.emit(true);
      this.resultItemList.emit(this.resultSearch);
    }
  }
}
