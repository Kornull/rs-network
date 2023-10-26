import { Component, OnInit } from '@angular/core';
import {
  FilterActivateService,
  SearchResultService,
} from 'src/app/core/services';
import { SearchItem } from 'src/app/core/store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  cardsResult: SearchItem[] = [];

  constructor(
    private searchResultService: SearchResultService,
    public filterActivateService: FilterActivateService
  ) {}

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    this.searchResultService
      .getItems()
      .subscribe(cards => (this.cardsResult = cards));
  }
}
