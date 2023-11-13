import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import {
  FilterActivateService,
  FilterOpenedService,
  SearchResultService,
  SortResultService,
} from 'src/app/core/services';
import { DefaultDataCustomBtn, SearchItem } from 'src/app/core/store';

@Component({
  selector: 'app-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss'],
})
export class CardBlockComponent implements OnInit {
  cardDetails: SearchItem | null;

  goBackBtnStyle: string = DefaultDataCustomBtn.GO_BACK;

  constructor(
    private filterActivateService: FilterActivateService,
    private location: Location,
    private filterOpenedService: FilterOpenedService,
    private sortResultService: SortResultService,
    private route: ActivatedRoute,
    private searchResultService: SearchResultService
  ) {}

  ngOnInit(): void {
    this.filterOpenedService.closeFilter();
    this.filterActivateService.turnOffBtn();
    this.sortResultService.resetSort();
    // this.route.params.subscribe((params: Params) => {
    //   this.cardDetails = this.searchResultService.getItem(params['id']);
    // });
  }

  goBack(): void {
    this.filterActivateService.turnOnBtn();
    this.location.back();
  }
}
