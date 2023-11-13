import { Injectable } from '@angular/core';

import { SearchResultService } from '../search-result/search-result.service';

@Injectable({
  providedIn: 'root',
})
export class FilterActivateService {
  private isFilterDisabled: boolean = true;

  constructor(private searchResultService: SearchResultService) {}

  activatedFilter(data: string): void {
    if (data.trim().length > 2) {
      this.isFilterDisabled = false;
      if (!this.searchResultService.isShowResultSearch) {
        this.searchResultService.setShowSearchResult();
      }
    } else {
      this.isFilterDisabled = true;
    }
  }

  getIsBtnDisabled(): boolean {
    return this.isFilterDisabled;
  }

  turnOffBtn() {
    this.isFilterDisabled = true;
  }

  turnOnBtn() {
    this.isFilterDisabled = false;
  }
}
