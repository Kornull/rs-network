import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import {
  FilterActivateService,
  SearchResultService,
} from 'src/app/core/services';
import { DefaultDataCustomBtn, SearchItem } from 'src/app/core/store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  card: SearchItem | null;

  goBackBtnStyle: string = DefaultDataCustomBtn.GO_BACK;

  constructor(
    private filterActivateService: FilterActivateService,
    private route: ActivatedRoute,
    private location: Location,
    private searchResultService: SearchResultService
  ) {}

  ngOnInit(): void {
    this.filterActivateService.turnOffBtn();
    this.route.params.subscribe((params: Params) => {
      this.card = this.searchResultService.getItem(params['id']);
    });
  }

  goBack(): void {
    this.filterActivateService.turnOnBtn();
    this.location.back();
  }
}
