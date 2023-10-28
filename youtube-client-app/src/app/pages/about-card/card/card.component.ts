import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { SearchResultService } from 'src/app/core/services';
import { SearchItem } from 'src/app/core/store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  card: SearchItem | null;

  constructor(
    private route: ActivatedRoute,
    private searchResultService: SearchResultService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.card = this.searchResultService.getItem(params['id']);
    });
  }
}
