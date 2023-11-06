import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SearchItem } from 'src/app/core/store';
import { SharedModule } from 'src/app/shared';

@Component({
  selector: 'app-result-item',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    SharedModule,
  ],
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss'],
})
export class ResultItemComponent {
  @Input() card: SearchItem;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onRunTo() {
    this.router.navigate([`about/${this.card.id}`], { relativeTo: this.route });
  }
}
