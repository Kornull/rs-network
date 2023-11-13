import { Component, Input } from '@angular/core';

import { SearchItemDetails } from 'src/app/core/store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card: SearchItemDetails;

  getShortedDescription(descr: string): string {
    return descr.length > 252 ? `${descr.slice(0, 249)}...` : descr;
  }
}
