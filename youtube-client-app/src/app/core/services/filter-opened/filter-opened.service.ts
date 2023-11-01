import { Injectable } from '@angular/core';

import { FilterActivateService } from '../filter-activate/filter-activate.service';

@Injectable({
  providedIn: 'root',
})
export class FilterOpenedService {
  private isFilterOpened: boolean = false;

  constructor(private filterActive: FilterActivateService) {}

  changeFilterStatus(): boolean {
    if (!this.filterActive.getIsBtnDisabled()) {
      this.isFilterOpened = !this.isFilterOpened;
      return this.isFilterOpened;
    }
    return this.isFilterOpened;
  }

  getFilterStatus() {
    return this.isFilterOpened;
  }
}
