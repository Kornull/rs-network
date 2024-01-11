import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ErrorTypes } from '../../../../core/store/models';
import ClearStoreService from '../../../../core/services/clear-store/clear.service';
import RequestsService from '../../../../core/services/requests/requests.service';
import SnackBarService from '../../../../core/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-profile-logout-btn',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './profile-logout-btn.component.html',
  styleUrl: './profile-logout-btn.component.scss',
})
export class ProfileLogoutBtnComponent {
  constructor(
    private requestService: RequestsService,
    private toast: SnackBarService,
    private clear: ClearStoreService
  ) {}

  logout() {
    this.requestService.profileLogout().subscribe({
      next: () => {
        this.toast.openSnack('Logout success', false);
        this.clear.clearUserStorage();
      },
      error: err => {
        const { error } = err;
        if (err.type === 'error') {
          this.toast.openSnack(err.message, true);
        } else {
          if (error.message === ErrorTypes.TOKEN_ERROR) {
            this.toast.openSnack(error.message, true);
            this.clear.clearUserStorage();
            return;
          }
          this.toast.openSnack(error.message, true);
        }
      },
    });
  }
}
