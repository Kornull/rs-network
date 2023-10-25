import { FilterOpenedService } from 'src/app/core/services';
import { Component,EventEmitter,Output } from '@angular/core';

import { SearchItem } from 'src/app/core/store/models/search-item.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() isViewSearchResults = new EventEmitter<boolean>();

  @Output() isOpenFilter = new EventEmitter<boolean>();

  @Output() searchItemResults = new EventEmitter<SearchItem[]>();

  constructor(private filterOpen: FilterOpenedService) { }

  onShowFilter(): boolean {
    return this.filterOpen.getFilterStatus();
  }

  onViewResults(ev: boolean): void {
    this.isViewSearchResults.emit(ev);
  }

  onSearchItemResult(ev: SearchItem[]): void {
    this.searchItemResults.emit(ev);
  }
}
