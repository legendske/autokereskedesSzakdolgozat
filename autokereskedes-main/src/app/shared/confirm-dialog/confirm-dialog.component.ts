import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewModels } from '../models/view-models';

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ViewModels.IConfirmDialogData
  ) {}
}
