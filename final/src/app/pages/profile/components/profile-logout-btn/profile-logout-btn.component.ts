import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RequestsService, SnackBarService } from '../../../../core/services';
import { ErrorTypes } from '../../../../core/store/models';

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
    private router: Router
  ) {}

  logout() {
    this.requestService.profileLogout().subscribe({
      next: () => {
        this.toast.openSnack('Logout success', false);
        this.deleteCookie();
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['']);
      },
      error: err => {
        const { error } = err;
        if (error === null) {
          this.toast.openSnack(err.statusText, true);
        } else {
          if (error.message === ErrorTypes.TOKEN_ERROR) {
            this.toast.openSnack(error.message, true);
            localStorage.clear();
            setTimeout(() => {
              window.location.reload();
            }, 1800);
            return;
          }
          this.toast.openSnack(error.message, true);
        }
      },
    });
  }

  deleteCookie() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  }
}
