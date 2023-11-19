import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FilterActivateService } from 'src/app/core/services';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor(
    private filterActivateService: FilterActivateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filterActivateService.turnOffBtn();
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }
}
