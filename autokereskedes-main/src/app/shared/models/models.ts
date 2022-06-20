export namespace Models {
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
    conditionId: string;
    colorId: string;
    brandId: string;
    numberOfKilometers: number;
    numberOfSeats: number;
    numberOfDoors: number;
    cylinderCapacity: number;
    power: number;
    fuelTypeId: string;
  }

  export interface IData {
    id: string;
    name: string;
    isActive: boolean;
  }

  export interface IProfile {
    id: string;
    userId: string;
    displayName: string;
    phoneNumber: string;
  }
}
