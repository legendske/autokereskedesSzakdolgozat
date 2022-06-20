import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISelectOption } from '../common/data-structure';
import { ViewModels } from '../models/view-models';

@Component({
  selector: 'advertisement-filter',
  templateUrl: 'advertisement-filter.component.html',
  styleUrls: ['./advertisement-filter.component.scss'],
})
export class AdvertisementFilterComponent implements OnInit {
  @Input() vehicleTypeOptions: ISelectOption<string>[];
  @Input() vehicleBrandOptions: ISelectOption<string>[];
  @Input() vehicleConditionOptions: ISelectOption<string>[];
  @Input() vehicleColorOptions: ISelectOption<string>[];
  @Input() fuelTypesOptions: ISelectOption<string>[];

  @Output() onFilter = new EventEmitter<ViewModels.IFilter>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      brandIds: null,
      typeIds: null,
      priceFrom: null,
      priceTo: null,
      conditionIds: null,
      colorIds: null,
      fuelTypeIds: null,
      numberOfSeats: null,
    });
  }

  onSubmit(): void {
    this.onFilter.emit(this.form.value);
  }

  onReset(): void {
    this.form.reset();
  }
}
