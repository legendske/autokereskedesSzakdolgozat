import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ValidatePassword } from './password-dialog.utils';

@Component({
  selector: 'password-dialog',
  templateUrl: 'password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss'],
})
export class PasswordDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PasswordDialogComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, Validators.required],
      },
      { validators: [ValidatePassword.MatchPassword] }
    );
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.form.get('confirmPassword');
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.password?.value);
  }
}
