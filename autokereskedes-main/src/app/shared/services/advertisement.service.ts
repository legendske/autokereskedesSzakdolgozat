import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { PathConstants } from '../models/constants';
import { Models } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementService {
  constructor(private firestore: Firestore) {}

  getAdvertisements(): Observable<Models.IAdvertisement[]> {
    const advertisementsRef = collection(this.firestore, PathConstants.ADVERTISEMENTS);
    return collectionData(advertisementsRef, { idField: 'id' }) as Observable<Models.IAdvertisement[]>;
  }

  async createAdvertisement(advertisement: Models.IAdvertisement): Promise<void> {
    const advertisementsRef = collection(this.firestore, PathConstants.ADVERTISEMENTS);
    await addDoc(advertisementsRef, advertisement);
  }

  async updateAdvertisement(advertisement: Models.IAdvertisement): Promise<void> {
    const advertisementDocRef = doc(
      this.firestore,
      `${PathConstants.ADVERTISEMENTS}/${advertisement.id}`
    );
    await setDoc(advertisementDocRef, advertisement);
  }

  async deleteAdvertisement(id: string): Promise<void> {
    const advertisementDocRef = doc(this.firestore, `${PathConstants.ADVERTISEMENTS}/${id}`);
    await deleteDoc(advertisementDocRef);
  }

  async updateAdvertisementState(id: string, isActive: boolean): Promise<void> {
    const advertisementDocRef = doc(this.firestore, `${PathConstants.ADVERTISEMENTS}/${id}`);
    await updateDoc(advertisementDocRef, { isActive: isActive });
  }
}
