import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class ErrorService {
  // constructor() {}
  // showError(err: any) {
  //   const { error } = err;
  //   if (err.statusText) {
  //     this.toast.openSnack(err.statusText, true);
  //   } else {
  //     if (error.message.includes('was not')) {
  //       localStorage.clear();
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1800);
  //     }
  //     this.toast.openSnack(error.message, true);
  //   }
  // }
}
