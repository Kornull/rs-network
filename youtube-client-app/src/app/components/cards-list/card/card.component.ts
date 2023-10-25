import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


import { SearchItem } from 'src/app/models/search-item.model';
import { DefaultColorCardDirective } from 'src/app/shared/directives/default-color-card.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    DefaultColorCardDirective,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card!: SearchItem;
}
