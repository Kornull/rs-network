import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterActivateService {
  private isFilterDisabled: boolean = true;

  activatedFilter(data: string): void {
    if (data.trim().length) {
      this.isFilterDisabled = false;
    }
  }

  getIsBtnDisabled(): boolean {
    return this.isFilterDisabled;
  }

  getIsSearchRun(): boolean {
    return !this.isFilterDisabled;
  }

  setActivateBtn() {
    this.isFilterDisabled = true;
  }
}
