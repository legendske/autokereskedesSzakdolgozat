import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Messages } from 'src/app/shared/models/constants';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UserService } from '../../../shared/services/user.service';
import { LoginData } from '../auth.types';

@Component({
  selector: 'registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly snackBarService: SnackBarService
  ) {}

  async register(data: LoginData): Promise<void> {
    try {
      await this.userService.register(data);
      await this.router.navigate(['/home']);
    } catch {
      this.snackBarService.error(Messages.REGISTRATION_ERROR);
    }
  }
}
