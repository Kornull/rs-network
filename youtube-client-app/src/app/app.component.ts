import { Component } from '@angular/core';

import { SearchItem } from './core/store/models/search-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'youtube-client-app';

  dateSort: string;

  viewCountSort: string;

  titleSort: string;

  searchItems: SearchItem[];

  isOpenedFilter: boolean = false;

  isViewResult: boolean = false;

  onUpdateSearch(searchResult: SearchItem[]): void {
    this.searchItems = [...searchResult];
    this.viewCountSort = '';
    this.dateSort = '';
    this.titleSort = '';
  }
}
