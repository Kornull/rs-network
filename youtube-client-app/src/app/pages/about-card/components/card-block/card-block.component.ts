import { SearchValueService } from 'src/app/core/services/search-value/search-value.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import {
  FilterActivateService,
  FilterOpenedService,
  SearchResultService,
  SortResultService,
} from 'src/app/core/services';
import { DefaultDataCustomBtn, SearchItemDetails } from 'src/app/core/store';

@Component({
  selector: 'app-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss'],
})
export class CardBlockComponent implements OnInit {
  cardDetails: SearchItemDetails | null;

  goBackBtnStyle: string = DefaultDataCustomBtn.GO_BACK;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private filterActivateService: FilterActivateService,
    private filterOpenedService: FilterOpenedService,
    private sortResultService: SortResultService,
    private searchResultService: SearchResultService,
    private searchValueService: SearchValueService
  ) {}

  ngOnInit(): void {
    this.filterOpenedService.closeFilter();
    this.filterActivateService.turnOffBtn();
    this.sortResultService.resetSort();
    this.route.params.subscribe((params: Params) => {
      this.cardDetails = this.searchResultService.getCard(params['id']);
    });
    this.searchValueService.setValue('');
  }

  goBack(): void {
    this.filterActivateService.turnOnBtn();
    this.location.back();
  }
}
