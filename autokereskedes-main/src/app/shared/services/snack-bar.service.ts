import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ViewModels } from '../models/view-models';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private readonly durationInSeconds = 5;
  private readonly defaultConfig: MatSnackBarConfig = {
    duration: this.durationInSeconds * 1000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  constructor(private snackBar: MatSnackBar) {}

  success(text: string): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      ...this.defaultConfig,
      data: {
        status: ViewModels.OperationStatus.SUCCESS,
        content: text,
        title: 'Sikeres művelet',
      },
      panelClass: 'success',
    } as MatSnackBarConfig<ViewModels.ISnackBarData>);
  }

  error(text: string): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      ...this.defaultConfig,
      data: {
        status: ViewModels.OperationStatus.FAILED,
        content: text,
        title: 'Figyelem',
      },
      panelClass: 'error',
    } as MatSnackBarConfig<ViewModels.ISnackBarData>);
  }
}
