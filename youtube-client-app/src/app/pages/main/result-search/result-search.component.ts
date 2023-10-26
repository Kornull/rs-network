import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ResultItemComponent } from '../result-item/result-item.component';

@Component({
  selector: 'app-result-search',
  standalone: true,
  imports: [CommonModule, ResultItemComponent],
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.scss'],
})
export class ResultSearchComponent {}
