import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'firebase/auth';
import { AuthService } from '../../shared/services/auth.service';
import { ValidatePassword } from './profile-page.utils';

@Component({
  selector: 'profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  passwordForm: FormGroup;
  profileForm: FormGroup;

  constructor(readonly authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group(
      {
        password: [
          { value: '', disabled: !this.hasPassword },
          [Validators.required, Validators.minLength(6)],
        ],
        confirmPassword: [
          { value: '', disabled: !this.hasPassword },
          Validators.required,
        ],
      },
      { validators: [ValidatePassword.MatchPassword] }
    );

    this.profileForm = this.fb.group({
      displayName: this.currentUser?.displayName ?? '',
      phoneNumber: this.currentUser?.photoURL ?? '',
    });
  }

  get currentUser(): User | null {
    return this.authService.currentUser;
  }

  get hasPassword(): boolean {
    return this.authService.hasPassword;
  }

  get password(): AbstractControl | null {
    return this.passwordForm.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.passwordForm.get('confirmPassword');
  }

  get displayName(): AbstractControl | null {
    return this.profileForm.get('displayName');
  }

  get phoneNumber(): AbstractControl | null {
    return this.profileForm.get('phoneNumber');
  }

  onPasswordFormSubmit(): void {
    this.authService.updatePassword(this.password?.value);
    this.passwordForm.reset();
  }

  onProfileFormSubmit(): void {
    this.authService.updateProfile(
      this.displayName?.value,
      this.phoneNumber?.value
    );
  }
}
