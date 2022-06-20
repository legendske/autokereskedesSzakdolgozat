import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Models } from '../models/models';
import { ViewModels } from '../models/view-models';
import { AdvertisementService } from '../services/advertisement.service';
import { MasterDataService } from '../services/master-data.service';
import { AdvertisementContainerComponent } from './advertisement-container.component';

describe('AdvertisementContainerComponent', () => {
  let fixture: ComponentFixture<AdvertisementContainerComponent>;
  let component: AdvertisementContainerComponent;

  let advertisementServiceSpy: jasmine.SpyObj<AdvertisementService>;
  let masterDataServiceSpy: jasmine.SpyObj<MasterDataService>;

  beforeEach(async () => {
    advertisementServiceSpy = jasmine.createSpyObj('advertisementService', [
      'getAdvertisements',
    ]);

    advertisementServiceSpy.getAdvertisements.and.returnValue(
      of([
        {
          id: 'id1',
          isActive: true,
          vehicle: {
            brandId: '1',
            colorId: '2',
            fuelTypeId: '1',
            conditionId: '2',
            typeId: '1',
          } as Models.IVehicle,
        } as Models.IAdvertisement,
        {
          id: 'id2',
          isActive: true,
          vehicle: {
            brandId: '2',
            colorId: '1',
            fuelTypeId: '2',
            conditionId: '1',
            typeId: '2',
          } as Models.IVehicle,
        } as Models.IAdvertisement,
      ])
    );

    masterDataServiceSpy = jasmine.createSpyObj('masterDataService', [
      'getVehicleTypes',
      'getVehicleBrands',
      'getVehicleConditions',
      'getVehicleColors',
      'getFuelTypes',
    ]);

    masterDataServiceSpy.getFuelTypes.and.returnValue(
      of([
        {
          id: '1',
          name: 'FuelType1',
          isActive: true,
        },
        {
          id: '2',
          name: 'FuelType2',
          isActive: true,
        },
      ])
    );

    masterDataServiceSpy.getVehicleTypes.and.returnValue(
      of([
        {
          id: '1',
          name: 'VehicleType1',
          isActive: true,
        },
        {
          id: '2',
          name: 'VehicleType2',
          isActive: true,
        },
      ])
    );

    masterDataServiceSpy.getVehicleBrands.and.returnValue(
      of([
        {
          id: '1',
          name: 'VehicleBrand1',
          isActive: true,
        },
        {
          id: '2',
          name: 'VehicleBrand2',
          isActive: true,
        },
      ])
    );

    masterDataServiceSpy.getVehicleColors.and.returnValue(
      of([
        {
          id: '1',
          name: 'VehicleColor1',
          isActive: true,
        },
        {
          id: '2',
          name: 'VehicleColor2',
          isActive: true,
        },
      ])
    );

    masterDataServiceSpy.getVehicleConditions.and.returnValue(
      of([
        {
          id: '1',
          name: 'VehicleCondition1',
          isActive: true,
        },
        {
          id: '2',
          name: 'VehicleCondition2',
          isActive: true,
        },
      ])
    );

    await TestBed.configureTestingModule({
      declarations: [AdvertisementContainerComponent],
      providers: [
        { provide: AdvertisementService, useValue: advertisementServiceSpy },
        { provide: MasterDataService, useValue: masterDataServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('handle advertisements', () => {
    it('should load and map advertisements', () => {
      // Arrange
      fixture.detectChanges();

      let advertisements: ViewModels.IAdvertisement[] | undefined = [];
      component.advertisements$.subscribe((p) => {
        advertisements = p;
      });

      const expectedAdvertisements = [
        {
          id: 'id1',
          isActive: true,
          title: undefined,
          description: undefined,
          image: undefined,
          userId: undefined,
          price: undefined,
          vehicle: {
            brandId: '1',
            brand: 'VehicleBrand1',
            colorId: '2',
            color: 'VehicleColor2',
            fuelTypeId: '1',
            fuelType: 'FuelType1',
            conditionId: '2',
            condition: 'VehicleCondition2',
            typeId: '1',
            type: 'VehicleType1',
            year: undefined,
            model: undefined,
            numberOfKilometers: undefined,
            numberOfSeats: undefined,
            numberOfDoors: undefined,
            cylinderCapacity: undefined,
            power: undefined,
          },
        },
        {
          id: 'id2',
          isActive: true,
          title: undefined,
          description: undefined,
          image: undefined,
          userId: undefined,
          price: undefined,
          vehicle: {
            brandId: '2',
            brand: 'VehicleBrand2',
            colorId: '1',
            color: 'VehicleColor1',
            fuelTypeId: '2',
            fuelType: 'FuelType2',
            conditionId: '1',
            condition: 'VehicleCondition1',
            typeId: '2',
            type: 'VehicleType2',
            year: undefined,
            model: undefined,
            numberOfKilometers: undefined,
            numberOfSeats: undefined,
            numberOfDoors: undefined,
            cylinderCapacity: undefined,
            power: undefined,
          },
        },
      ] as unknown as ViewModels.IAdvertisement[];

      // Act
      fixture.detectChanges();

      // Assert
      expect(component.vehicleBrandOptions).toEqual([
        {
          id: '1',
          value: 'VehicleBrand1',
        },
        {
          id: '2',
          value: 'VehicleBrand2',
        },
      ]);

      expect(component.fuelTypesOptions).toEqual([
        {
          id: '1',
          value: 'FuelType1',
        },
        {
          id: '2',
          value: 'FuelType2',
        },
      ]);

      expect(component.vehicleTypeOptions).toEqual([
        {
          id: '1',
          value: 'VehicleType1',
        },
        {
          id: '2',
          value: 'VehicleType2',
        },
      ]);

      expect(component.vehicleColorOptions).toEqual([
        {
          id: '1',
          value: 'VehicleColor1',
        },
        {
          id: '2',
          value: 'VehicleColor2',
        },
      ]);

      expect(component.vehicleConditionOptions).toEqual([
        {
          id: '1',
          value: 'VehicleCondition1',
        },
        {
          id: '2',
          value: 'VehicleCondition2',
        },
      ]);

      expect(advertisements).toEqual(expectedAdvertisements);
    });

    it('should filter advertisements', () => {
      // Arrange
      fixture.detectChanges();

      let advertisements: ViewModels.IAdvertisement[] | undefined = [];
      component.advertisements$.subscribe((p) => {
        advertisements = p;
      });

      // Act
      component.onFilter({
        colorIds: [1],
        brandIds: [1],
      } as unknown as ViewModels.IFilter);
      fixture.detectChanges();

      // Assert
      expect(advertisements).toEqual([]);
    });
  });
});
