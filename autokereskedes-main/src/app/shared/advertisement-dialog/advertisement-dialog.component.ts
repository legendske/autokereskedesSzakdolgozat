import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISelectOption, toSelectOptions } from '../common/data-structure';
import { Models } from '../models/models';
import { ViewModels } from '../models/view-models';
import { MasterDataService } from '../services/master-data.service';
import { validateNumericMaxLength } from './advertisement-dialog.utils';

@Component({
  selector: 'advertisement-dialog',
  templateUrl: 'advertisement-dialog.component.html',
  styleUrls: ['./advertisement-dialog.component.scss'],
})
export class AdvertisementDialogComponent implements OnInit {
  form: FormGroup;
  readonly hasPermission: boolean;

  vehicleTypeOptions: ISelectOption<string>[] = [];
  vehicleBrandOptions: ISelectOption<string>[] = [];
  vehicleConditionOptions: ISelectOption<string>[] = [];
  vehicleColorOptions: ISelectOption<string>[] = [];
  fuelTypesOptions: ISelectOption<string>[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdvertisementDialogComponent>,
    private masterDataService: MasterDataService,
    @Inject(MAT_DIALOG_DATA) public data: ViewModels.IAdvertisementDialogData
  ) {
    this.hasPermission =
      data.advertisement === null ||
      (!!data.user && data.advertisement.userId === data.user.uid);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: this.data.advertisement?.id ?? null,
      title: [
        {
          value: this.data.advertisement?.title ?? null,
          disabled: !this.hasPermission,
        },
        Validators.required,
      ],
      description: [
        {
          value: this.data.advertisement?.description ?? null,
          disabled: !this.hasPermission,
        },
      ],
      image: [
        {
          value: this.data.advertisement?.image ?? null,
          disabled: !this.hasPermission,
        },
      ],
      userId: [
        this.data.advertisement?.userId ?? this.data.user?.uid,
        Validators.required,
      ],
      price: [
        {
          value: this.data.advertisement?.price ?? null,
          disabled: !this.hasPermission,
        },
        [Validators.required, validateNumericMaxLength(7)],
      ],
      isActive: [
        {
          value: this.data.advertisement?.isActive ?? true,
          disabled: !this.hasPermission,
        },
        Validators.required,
      ],
      vehicle: this.fb.group({
        model: [
          {
            value: this.data.advertisement?.vehicle?.model ?? null,
            disabled: !this.hasPermission,
          },
          Validators.required,
        ],
        typeId: [
          {
            value: this.data.advertisement?.vehicle?.typeId ?? null,
            disabled: !this.hasPermission,
          },
          Validators.required,
        ],
        conditionId: [
          {
            value: this.data.advertisement?.vehicle?.conditionId ?? null,
            disabled: !this.hasPermission,
          },
          Validators.required,
        ],
        colorId: [
          {
            value: this.data.advertisement?.vehicle?.colorId ?? null,
            disabled: !this.hasPermission,
          },
          Validators.required,
        ],
        brandId: [
          {
            value: this.data.advertisement?.vehicle?.brandId ?? null,
            disabled: !this.hasPermission,
          },
          Validators.required,
        ],
        year: [
          {
            value: this.data.advertisement?.vehicle?.year ?? null,
            disabled: !this.hasPermission,
          },
          [Validators.required, validateNumericMaxLength(4)],
        ],
        numberOfKilometers: [
          {
            value: this.data.advertisement?.vehicle?.numberOfKilometers ?? null,
            disabled: !this.hasPermission,
          },
          validateNumericMaxLength(6),
        ],
        numberOfSeats: [
          {
            value: this.data.advertisement?.vehicle?.numberOfSeats ?? null,
            disabled: !this.hasPermission,
          },
          validateNumericMaxLength(2),
        ],
        numberOfDoors: [
          {
            value: this.data.advertisement?.vehicle?.numberOfDoors ?? null,
            disabled: !this.hasPermission,
          },
          validateNumericMaxLength(1),
        ],
        cylinderCapacity: [
          {
            value: this.data.advertisement?.vehicle?.cylinderCapacity ?? null,
            disabled: !this.hasPermission,
          },
          validateNumericMaxLength(4),
        ],
        power: [
          {
            value: this.data.advertisement?.vehicle?.power ?? null,
            disabled: !this.hasPermission,
          },
          validateNumericMaxLength(4),
        ],
        fuelTypeId: [
          {
            value: this.data.advertisement?.vehicle?.fuelTypeId ?? null,
            disabled: !this.hasPermission,
          },
          Validators.required,
        ],
      }),
    });

    this.masterDataService
      .getVehicleTypes()
      .subscribe((types: Models.IData[]) => {
        this.vehicleTypeOptions = toSelectOptions(types);
      });

    this.masterDataService
      .getVehicleBrands()
      .subscribe((brands: Models.IData[]) => {
        this.vehicleBrandOptions = toSelectOptions(brands);
      });

    this.masterDataService
      .getVehicleConditions()
      .subscribe((conditions: Models.IData[]) => {
        this.vehicleConditionOptions = toSelectOptions(conditions);
      });

    this.masterDataService
      .getVehicleColors()
      .subscribe((colors: Models.IData[]) => {
        this.vehicleColorOptions = toSelectOptions(colors);
      });

    this.masterDataService
      .getFuelTypes()
      .subscribe((fuelTypes: Models.IData[]) => {
        this.fuelTypesOptions = toSelectOptions(fuelTypes);
      });
  }

  get title(): AbstractControl | null {
    return this.form.get('title');
  }

  get model(): AbstractControl | null {
    return this.form.get('model');
  }

  get conditionId(): AbstractControl | null {
    return this.form.get('conditionId');
  }

  get colorId(): AbstractControl | null {
    return this.form.get('colorId');
  }

  get brandId(): AbstractControl | null {
    return this.form.get('brandId');
  }

  get year(): AbstractControl | null {
    return this.form.get('year');
  }

  get typeId(): AbstractControl | null {
    return this.form.get('typeId');
  }

  get fuelTypeId(): AbstractControl | null {
    return this.form.get('fuelTypeId');
  }

  get image(): AbstractControl | null {
    return this.form.get('image');
  }

  get price(): AbstractControl | null {
    return this.form.get('price');
  }

  get power(): AbstractControl | null {
    return this.form.get('power');
  }

  get cylinderCapacity(): AbstractControl | null {
    return this.form.get('cylinderCapacity');
  }

  get numberOfKilometers(): AbstractControl | null {
    return this.form.get('numberOfKilometers');
  }

  get numberOfSeats(): AbstractControl | null {
    return this.form.get('numberOfSeats');
  }

  get numberOfDoors(): AbstractControl | null {
    return this.form.get('numberOfDoors');
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.form.getRawValue() as Models.IAdvertisement);
  }

  handleImageInputChange(event: any): void {
    const file = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      return;
    }

    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  private handleReaderLoaded(event: any): void {
    this.image?.setValue(event.target.result);
  }
}
