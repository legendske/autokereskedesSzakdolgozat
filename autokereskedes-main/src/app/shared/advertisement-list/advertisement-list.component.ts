import { Component, Input } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdvertisementDialogComponent } from '../advertisement-dialog/advertisement-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Messages } from '../models/constants';
import { ViewModels } from '../models/view-models';
import { AdvertisementService } from '../services/advertisement.service';
import { SnackBarService } from '../services/snack-bar.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.scss'],
})
export class AdvertisementListComponent {
  @Input() advertisements: ViewModels.IAdvertisement[] | undefined | null;
  @Input() user: User | null;

  constructor(
    private readonly dialog: MatDialog,
    private readonly advertisementService: AdvertisementService,
    private readonly snackBarService: SnackBarService,
    private readonly userService: UserService
  ) {}

  async openAdvertisementDialog(
    advertisement: ViewModels.IAdvertisement
  ): Promise<void> {
    const dialogRef = this.dialog.open(AdvertisementDialogComponent, {
      width: '950px',
      data: {
        advertisement,
        user: this.user,
        profile: this.userService.getProfile(advertisement?.userId),
      },
    } as MatDialogConfig<ViewModels.IAdvertisementDialogData>);

    dialogRef.afterClosed().subscribe(async (advertisement) => {
      if (advertisement) {
        try {
          await this.advertisementService.updateAdvertisement(advertisement);
        } catch {
          this.snackBarService.error(Messages.UPDATE_ADVERTISEMENT_ERROR);
        }
      }
    });
  }

  async openDeleteConfirmDialog(advertisementId: string): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Hírdetés törlése',
        content: 'Biztosan szeretné törölni ezt a hírdetést?',
        buttonText: 'Mentés',
      },
    } as MatDialogConfig<ViewModels.IConfirmDialogData>);

    dialogRef.afterClosed().subscribe(async (shouldDelete) => {
      if (shouldDelete) {
        try {
          await this.advertisementService.deleteAdvertisement(advertisementId);
        } catch {
          this.snackBarService.error(Messages.DELETE_ADVERTISEMENT_ERROR);
        }
      }
    });
  }

  async openUpdateStateConfirmDialog(
    advertisementId: string,
    isActive: boolean
  ): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: `Hírdetés ${isActive ? 'aktiválása' : 'inaktiválása'}`,
        content: `Biztosan szeretné ${
          isActive ? 'aktiválni' : 'inaktiválni'
        } ezt a hírdetést?`,
        buttonText: 'Mentés',
      },
    } as MatDialogConfig<ViewModels.IConfirmDialogData>);

    dialogRef.afterClosed().subscribe(async (shouldUpdate) => {
      if (shouldUpdate) {
        try {
          await this.advertisementService.updateAdvertisementState(
            advertisementId,
            isActive
          );
        } catch {
          this.snackBarService.error(
            isActive
              ? Messages.ACTIVATE_ADVERTISEMENT_ERROR
              : Messages.INACTIVATE_ADVERTISEMENT_ERROR
          );
        }
      }
    });
  }
}
