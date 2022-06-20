import { User } from "@firebase/auth";
import { toObject } from "../common/data-structure";
import { Models } from "../models/models";
import { ViewModels } from "../models/view-models";

export function filterModels(advertisements: Models.IAdvertisement[], filter: ViewModels.IFilter, user: User | null): Models.IAdvertisement[] {
    if (user) {
      advertisements = advertisements.filter(p => p.userId === user?.uid);
    }
    else {
      advertisements = advertisements.filter(p => p.isActive);
    }

    if (filter.brandIds?.length) {
      advertisements = advertisements.filter(p => filter.brandIds.includes(p.vehicle.brandId));
    }

    if (filter.typeIds?.length) {
      advertisements = advertisements.filter(p => filter.typeIds.includes(p.vehicle.typeId));
    }

    if (filter.colorIds?.length) {
      advertisements = advertisements.filter(p => filter.colorIds.includes(p.vehicle.colorId));
    }

    if (filter.conditionIds?.length) {
      advertisements = advertisements.filter(p => filter.conditionIds.includes(p.vehicle.conditionId));
    }

    if (filter.fuelTypeIds?.length) {
      advertisements = advertisements.filter(p => filter.fuelTypeIds.includes(p.vehicle.fuelTypeId));
    }

    if (filter.numberOfSeats?.length) {
      advertisements = advertisements.filter(p => filter.numberOfSeats.includes(p.vehicle.numberOfSeats));
    }

    if (filter.priceFrom) {
      advertisements = advertisements.filter(p => p.price >= filter.priceFrom);
    }

    if (filter.priceTo) {
      advertisements = advertisements.filter(p => p.price <= filter.priceFrom);
    }

    return advertisements;
  }

  export function createViewModels(
    advertisements: Models.IAdvertisement[],
    vehicleTypes: Models.IData[],
    vehicleColors: Models.IData[],
    vehicleConditions: Models.IData[],
    vehicleBrands: Models.IData[],
    fuelTypes: Models.IData[]
  ): ViewModels.IAdvertisement[] {
    const vehicleTypesObj = toObject(vehicleTypes, (p) => p.id);
    const vehicleColorsObj = toObject(vehicleColors, (p) => p.id);
    const vehicleConditionsObj = toObject(vehicleConditions, (p) => p.id);
    const vehicleBrandsObj = toObject(vehicleBrands, (p) => p.id);
    const fuelTypesObj = toObject(fuelTypes, (p) => p.id);

    return advertisements.map(
      (p) =>
        ({
          id: p.id,
          title: p.title,
          description: p.description,
          image: p.image,
          userId: p.userId,
          price: p.price,
          isActive: p.isActive,
          vehicle: {
            typeId: p.vehicle.typeId,
            type: vehicleTypesObj[p.vehicle.typeId]?.name,
            colorId: p.vehicle.colorId,
            color: vehicleColorsObj[p.vehicle.colorId]?.name,
            conditionId: p.vehicle.conditionId,
            condition: vehicleConditionsObj[p.vehicle.conditionId]?.name,
            brandId: p.vehicle.brandId,
            brand: vehicleBrandsObj[p.vehicle.brandId]?.name,
            year: p.vehicle.year,
            model: p.vehicle.model,
            numberOfKilometers: p.vehicle.numberOfKilometers,
            numberOfSeats: p.vehicle.numberOfSeats,
            numberOfDoors: p.vehicle.numberOfDoors,
            cylinderCapacity: p.vehicle.cylinderCapacity,
            power: p.vehicle.power,
            fuelTypeId: p.vehicle.fuelTypeId,
            fuelType: fuelTypesObj[p.vehicle.fuelTypeId]?.name,
          } as ViewModels.IVehicle,
        } as ViewModels.IAdvertisement)
    );
  }
  