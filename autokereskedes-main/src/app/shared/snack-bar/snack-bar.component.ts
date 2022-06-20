import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ViewModels } from '../models/view-models';

@Component({
  selector: 'snack-bar',
  templateUrl: 'snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ViewModels.ISnackBarData
  ) {}

  get success(): ViewModels.OperationStatus {
    return ViewModels.OperationStatus.SUCCESS;
  }

  get failed(): ViewModels.OperationStatus {
    return ViewModels.OperationStatus.FAILED;
  }
}
