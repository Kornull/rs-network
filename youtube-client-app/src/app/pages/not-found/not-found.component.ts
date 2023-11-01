import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

import { FilterActivateService } from 'src/app/core/services';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor(
    private filterActivateService: FilterActivateService,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'notFoundIcon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/404.svg')
    );
  }

  ngOnInit(): void {
    this.filterActivateService.turnOffBtn();
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }
}
