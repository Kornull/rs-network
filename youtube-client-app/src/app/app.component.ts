import { Component } from '@angular/core';
import { SearchItem } from './models/search-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'youtube-client-app';

  searchItems!: SearchItem[];

  isOpenedFilter: boolean = false;

  isViewResult: boolean = false;

  onUpdateSearch(searchResult: SearchItem[]) {
    this.searchItems = [...searchResult];
  }
}
