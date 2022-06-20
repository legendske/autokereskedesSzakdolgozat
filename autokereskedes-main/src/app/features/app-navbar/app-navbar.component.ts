import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '@firebase/auth';
import { AdvertisementDialogComponent } from 'src/app/shared/advertisement-dialog/advertisement-dialog.component';
import { Messages } from 'src/app/shared/models/constants';
import { ViewModels } from 'src/app/shared/models/view-models';
import { PasswordDialogComponent } from 'src/app/shared/password-dialog/password-dialog.component';
import { ProfileDialogComponent } from 'src/app/shared/profile-dialog/profile-dialog.component';
import { AdvertisementService } from 'src/app/shared/services/advertisement.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
})
export class AppNavBarComponent {
  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
    private readonly advertisementService: AdvertisementService,
    private readonly router: Router,
    private readonly snackBarService: SnackBarService
  ) {}

  get user(): User | null {
    return this.userService.user;
  }

  get hasPassword(): boolean {
    return this.userService.hasPassword;
  }

  get profile(): ViewModels.IProfile | null {
    return this.userService.profile;
  }

  async openAdvertisementDialog(): Promise<void> {
    const dialogRef = this.dialog.open(AdvertisementDialogComponent, {
      width: '950px',
      data: {
        advertisement: null,
        user: this.user,
      },
    } as MatDialogConfig<ViewModels.IAdvertisementDialogData>);

    dialogRef.afterClosed().subscribe(async (advertisement) => {
      if (advertisement) {
        try {
          await this.advertisementService.createAdvertisement(advertisement);
          this.snackBarService.success(Messages.CREATE_ADVERTISEMENT_SUCCESS);
        } catch {
          this.snackBarService.error(Messages.CREATE_ADVERTISEMENT_ERROR);
        }
      }
    });
  }

  async openPasswordDialog(): Promise<void> {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(async (password) => {
      if (password) {
        try {
          await this.userService.updatePassword(password);
          this.snackBarService.success(Messages.UPDATE_PASSWORD_SUCCESS);
        } catch {
          this.snackBarService.error(Messages.UPDATE_PASSWORD_ERROR);
        }
      }
    });
  }

  async openProfileDialog(): Promise<void> {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '500px',
      data: {
        id: this.profile?.id,
        userId: this.profile?.userId ?? this.user?.uid,
        displayName: this.profile?.displayName,
        phoneNumber: this.profile?.phoneNumber,
      },
    } as MatDialogConfig<ViewModels.IProfile>);

    dialogRef.afterClosed().subscribe(async (profile) => {
      if (profile) {
        try {
          await this.userService.updateProfile(profile);
          this.snackBarService.success(Messages.UPDATE_PROFILE_SUCCESS);
        } catch {
          this.snackBarService.error(Messages.UPDATE_PROFILE_ERROR);
        }
      }
    });
  }

  async logout(): Promise<void> {
    try {
      await this.userService.logout();
      await this.router.navigate(['/home']);
    } catch {
      this.snackBarService.error(Messages.LOGOUT_ERROR);
    }
  }
}
