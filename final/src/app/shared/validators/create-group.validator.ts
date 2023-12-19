import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createGroupValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if (!value) {
      return null;
    }

    const specialCharacters = /[!@_+#%({}[\]\\/)=$^<>&*-]+/.test(value);

    const nameValid = specialCharacters;

    return nameValid ? { invalidTitle: true } : null;
  };
}
