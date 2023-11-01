import { Component } from '@angular/core';

import { FilterOpenedService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private filterOpenedService: FilterOpenedService) {}

  onShowFilter(): boolean {
    return this.filterOpenedService.getFilterStatus();
  }
}
