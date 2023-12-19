import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if (!value) {
      return null;
    }

    const specialCharacters = /[!@_+#%({}[\]\\/)=$^<>&*-]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const nameValid =
      (hasNumeric && specialCharacters) || hasNumeric || specialCharacters;

    return nameValid ? { invalidName: true } : null;
  };
}

export function sameNameValidator(name: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if (!value) {
      return null;
    }

    const sameNameValid = value === name;

    return sameNameValid ? { invalidName: true } : null;
  };
}
