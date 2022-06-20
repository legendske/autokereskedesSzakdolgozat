import { User } from '@angular/fire/auth';

export namespace ViewModels {
  export interface IAdvertisement {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
    userId: string;
    image: string;
    price: number;
    vehicle: IVehicle;
  }

  export interface IVehicle {
    model: string;
    year: number;
    typeId: string;
    type: string;
    conditionId: string;
    condition: string;
    colorId: string;
    color: string;
    brandId: string;
    brand: string;
    numberOfKilometers: number;
    numberOfSeats: number;
    numberOfDoors: number;
    cylinderCapacity: number;
    power: number;
    fuelTypeId: string;
    fuelType: string;
  }

  export interface IFilter {
    brandIds: string[];
    typeIds: string[];
    priceFrom: number;
    priceTo: number;
    conditionIds: string[];
    colorIds: string[];
    fuelTypeIds: string[];
    numberOfSeats: number[];
  }

  export interface IConfirmDialogData {
    title: string;
    content: string;
    buttonText: string;
  }

  export interface IAdvertisementDialogData {
    advertisement: IAdvertisement | null;
    user: User | null;
    profile: ViewModels.IProfile | null;
  }

  export interface IProfile {
    id: string;
    userId: string;
    displayName: string;
    phoneNumber: string;
  }

  export interface ISnackBarData {
    status: OperationStatus;
    title: string;
    content: string;
  }

  export enum OperationStatus {
    SUCCESS = 'Success',
    FAILED = 'Failed',
  }
}
