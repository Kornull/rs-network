import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import SnackBarService from '../snack-bar/snack-bar.service';
import ClearStoreService from '../clear-store/clear.service';

@Injectable({
  providedIn: 'root',
})
export default class ErrorService {
  constructor(
    private toast: SnackBarService,
    private clear: ClearStoreService
  ) {}

  showError(err: HttpErrorResponse) {
    const { error } = err;
    if (error === null || error.type === 'error') {
      this.toast.openSnack(err.statusText, true);
    } else {
      if (error.message !== undefined && error.message.includes('was not')) {
        this.clear.clearUserStorage();
        this.toast.openSnack(error.message, true);
        return;
      }
      if (error.message !== undefined) {
        this.toast.openSnack(error.message, true);
        return;
      }
      this.toast.openSnack(err.statusText, true);
    }
  }
}
