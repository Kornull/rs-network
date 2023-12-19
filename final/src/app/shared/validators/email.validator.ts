import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { LocalStoreKeys } from '../../core/store/models';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    const preResultInvalidEmails: string | null = localStorage.getItem(
      LocalStoreKeys.INVALID_EMAIL
    );
    if (!preResultInvalidEmails) {
      return null;
    }
    if (!value) {
      return null;
    }

    const isValidEmail: string[] = JSON.parse(preResultInvalidEmails);

    return isValidEmail.includes(value) ? { emailExist: true } : null;
  };
}
