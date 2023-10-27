import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchResultService } from 'src/app/core/services';
import { SearchItem } from 'src/app/core/store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  idCard: string;

  card: SearchItem | null;

  constructor(
    private route: ActivatedRoute,
    private searchResultService: SearchResultService
  ) {}

  ngOnInit(): void {
    this.idCard = this.route.snapshot.params['id'];
    this.getCard();
  }

  getCard() {
    this.card = this.searchResultService.getItem(this.idCard);
  }
}
