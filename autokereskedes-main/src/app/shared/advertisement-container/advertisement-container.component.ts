import { Component, Input, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { ISelectOption, toSelectOptions} from '../common/data-structure';
import { Models } from '../models/models';
import { ViewModels } from '../models/view-models';
import { AdvertisementService } from '../services/advertisement.service';
import { MasterDataService } from '../services/master-data.service';
import { filterModels, createViewModels } from './advertisement-container.utils';

@Component({
  selector: 'advertisement-container',
  templateUrl: './advertisement-container.component.html',
  styleUrls: ['./advertisement-container.component.scss'],
})
export class AdvertisementContainerComponent implements OnInit {
  @Input() user: User | null;

  advertisements$: Observable<ViewModels.IAdvertisement[] | undefined> = of(undefined);

  vehicleTypeOptions: ISelectOption<string>[] = [];
  vehicleBrandOptions: ISelectOption<string>[] = [];
  vehicleConditionOptions: ISelectOption<string>[] = [];
  vehicleColorOptions: ISelectOption<string>[] = [];
  fuelTypesOptions: ISelectOption<string>[] = [];

  private filter$: BehaviorSubject<ViewModels.IFilter> =
    new BehaviorSubject<ViewModels.IFilter>({} as ViewModels.IFilter);

  private filtering$: Observable<Models.IAdvertisement[]>;

  constructor(
    private advertisementService: AdvertisementService,
    private masterDataService: MasterDataService,
  ) {
  }

  ngOnInit(): void {
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

    this.filtering$ = combineLatest([this.advertisementService.getAdvertisements(), this.filter$]).pipe(map(([advertisements, filter]) => filterModels(advertisements, filter, this.user)));

    this.advertisements$ = combineLatest([
      this.filtering$,
      this.masterDataService.getVehicleTypes(),
      this.masterDataService.getVehicleColors(),
      this.masterDataService.getVehicleConditions(),
      this.masterDataService.getVehicleBrands(),
      this.masterDataService.getFuelTypes(),
    ]).pipe(
      map(
        ([
          advertisement,
          vehicleTypes,
          vehicleColors,
          vehicleConditions,
          vehicleBrands,
          fuelTypes,
        ]) =>
          createViewModels(
            advertisement,
            vehicleTypes,
            vehicleColors,
            vehicleConditions,
            vehicleBrands,
            fuelTypes
          )
      )
    );
  }

  onFilter(filter: ViewModels.IFilter): void {
    this.filter$.next(filter);
  }
}
