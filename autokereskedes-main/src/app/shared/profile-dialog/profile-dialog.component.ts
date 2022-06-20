import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewModels } from '../models/view-models';

@Component({
  selector: 'profile-dialog',
  templateUrl: 'profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss'],
})
export class ProfileDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ViewModels.IProfile
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: this.data?.id ?? null,
      userId: this.data.userId,
      displayName: [this.data?.displayName ?? null, [Validators.required]],
      phoneNumber: [this.data?.phoneNumber ?? null, [Validators.required]],
    });
  }

  get displayName(): AbstractControl | null {
    return this.form.get('displayName');
  }

  get phoneNumber(): AbstractControl | null {
    return this.form.get('phoneNumber');
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.form.value);
  }
}
