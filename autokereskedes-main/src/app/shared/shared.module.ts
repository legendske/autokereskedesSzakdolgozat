import { NgModule } from '@angular/core';
import { AdvertisementListComponent } from './advertisement-list/advertisement-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserFormComponent } from './user-form/user-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdvertisementDialogComponent } from './advertisement-dialog/advertisement-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdvertisementFilterComponent } from './advertisement-filter/advertisement-filter.component';
import { AdvertisementContainerComponent } from './advertisement-container/advertisement-container.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    AdvertisementListComponent,
    UserFormComponent,
    AdvertisementDialogComponent,
    AdvertisementFilterComponent,
    AdvertisementContainerComponent,
    ConfirmDialogComponent,
    SnackBarComponent,
    PasswordDialogComponent,
    ProfileDialogComponent,
  ],
  exports: [
    AdvertisementListComponent,
    UserFormComponent,
    AdvertisementDialogComponent,
    AdvertisementFilterComponent,
    AdvertisementContainerComponent,
    ConfirmDialogComponent,
    SnackBarComponent,
    PasswordDialogComponent,
    ProfileDialogComponent,
  ],
})
export class SharedModule {}
