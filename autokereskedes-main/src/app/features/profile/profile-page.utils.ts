import { AbstractControl } from '@angular/forms';

export class ValidatePassword {
  static MatchPassword(abstractControl: AbstractControl) {
    const password = abstractControl.get('password')?.value;
    const confirmPassword = abstractControl.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      abstractControl.get('confirmPassword')?.setErrors({
        matchPassword: true,
      });

      return;
    } else {
      return null;
    }
  }
}
