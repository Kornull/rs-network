import { Component } from '@angular/core';
import { SearchMockData } from './mock/mock-response';
import { SearchItem } from './models/search-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'youtube-client-app';

  searchItem: SearchItem[] = SearchMockData.items;
}
