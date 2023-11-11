import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;
    if (!value) return null;
    const dateNow = new Date().getTime();
    const dateFromForm = new Date(value).getTime();
    const dateValid = dateFromForm <= dateNow;

    return !dateValid ? { invalidDate: true } : null;
  };
}
