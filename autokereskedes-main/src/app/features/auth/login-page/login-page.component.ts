import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Messages } from 'src/app/shared/models/constants';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UserService } from '../../../shared/services/user.service';
import { LoginData } from '../auth.types';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly snackBarService: SnackBarService
  ) {}

  async login(loginData: LoginData): Promise<void> {
    try {
      await this.userService.login(loginData);
      await this.router.navigate(['/home']);
    } catch {
      this.snackBarService.error(Messages.LOGIN_ERROR);
    }
  }

  async loginWithGoogle(): Promise<void> {
    try {
      await this.userService.loginWithGoogle();
      await this.router.navigate(['/home']);
    } catch {
      this.snackBarService.error(Messages.LOGIN_ERROR);
    }
  }
}
