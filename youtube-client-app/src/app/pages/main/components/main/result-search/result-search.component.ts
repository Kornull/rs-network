import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CardDataType } from 'src/app/core/store';
import { ResultItemComponent } from '../result-item/result-item.component';

@Component({
  selector: 'app-result-search',
  standalone: true,
  imports: [CommonModule, ResultItemComponent],
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.scss'],
})
export class ResultSearchComponent {
  @Input() searchResult: CardDataType[];
}
