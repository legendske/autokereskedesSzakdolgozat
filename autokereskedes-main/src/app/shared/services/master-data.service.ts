import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PathConstants } from '../models/constants';
import { Models } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class MasterDataService {
  constructor(private firestore: Firestore) {}

  getVehicleTypes(): Observable<Models.IData[]> {
    const vehicleTypesRef = collection(this.firestore, PathConstants.VEHICLETYPES);
    return collectionData(vehicleTypesRef, { idField: 'id' }) as Observable<Models.IData[]>;
  }

  getVehicleColors(): Observable<Models.IData[]> {
    const vehicleColorsRef = collection(this.firestore, PathConstants.VEHICLECOLORS);
    return collectionData(vehicleColorsRef, { idField: 'id' }) as Observable<Models.IData[]>;
  }

  getVehicleBrands(): Observable<Models.IData[]> {
    const vehicleBrandsRef = collection(this.firestore, PathConstants.VEHICLEBRANDS);
    return collectionData(vehicleBrandsRef, { idField: 'id' }) as Observable<Models.IData[]>;
  }

  getVehicleConditions(): Observable<Models.IData[]> {
    const vehicleConditionsRef = collection(this.firestore, PathConstants.VEHICLECONDITIONS);
    return collectionData(vehicleConditionsRef, { idField: 'id' }) as Observable<Models.IData[]>;
  }

  getFuelTypes(): Observable<Models.IData[]> {
    const fuelTypesRef = collection(this.firestore, PathConstants.FUELTYPES);
    return collectionData(fuelTypesRef, { idField: 'id' }) as Observable<Models.IData[]>;
  }
}
