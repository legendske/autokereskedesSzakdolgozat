import { AbstractControl, ValidatorFn } from '@angular/forms';

export function validateNumericMaxLength(max: number): ValidatorFn {
  return (abstractControl: AbstractControl) => {
    if (!abstractControl?.value) {
      return null;
    }

    const value = abstractControl.value;
    const isValid = value.toString().length <= max;

    if (!isValid) {
      return {
        maxlength: { valid: false },
      };
    }

    return null;
  };
}
