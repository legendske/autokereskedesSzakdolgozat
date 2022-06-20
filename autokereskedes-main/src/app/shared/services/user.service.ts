import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  updatePassword,
} from '@angular/fire/auth';

import { Injectable } from '@angular/core';
import { LoginData } from '../../features/auth/auth.types';
import { ViewModels } from '../models/view-models';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Models } from '../models/models';
import { PathConstants, Providers } from '../models/constants';
import { Observable } from 'rxjs';
import { toObject } from '../common/data-structure';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: User | null = null;

  private profiles: Record<string, Models.IProfile> = {};

  constructor(
    private readonly auth: Auth,
    private readonly firestore: Firestore
  ) {
    this.auth.onAuthStateChanged((user) => {
      this._user = user;
    });

    this.getProfiles().subscribe((profiles) => {
      this.profiles = toObject(profiles, (p) => p.userId);
    });
  }

  get user(): User | null {
    return this._user;
  }

  get profile(): ViewModels.IProfile | null {
    if (!this.user?.uid || !this.profiles[this.user.uid]) {
      return null;
    }

    return this.profiles[this.user.uid];
  }

  get hasPassword(): boolean {
    if (!this.user?.providerData?.length) {
      return false;
    }

    return this.user.providerData[0].providerId === Providers.PASSWORD;
  }

  async login({ email, password }: LoginData): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async loginWithGoogle(): Promise<void> {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async register({ email, password }: LoginData): Promise<void> {
    await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  async updatePassword(newPassword: string): Promise<void> {
    if (!this.user) {
      throw new Error();
    }
    await updatePassword(this.user, newPassword);
  }

  async updateProfile(profile: Models.IProfile): Promise<void> {
    if (!profile.id) {
      const profilesRef = collection(this.firestore, PathConstants.PROFILES);
      await addDoc(profilesRef, profile);
      return;
    }

    const profileDocRef = doc(
      this.firestore,
      `${PathConstants.PROFILES}/${profile.id}`
    );
    await setDoc(profileDocRef, profile);
  }

  getProfile(userId: string): ViewModels.IProfile | null {
    const profile = this.profiles[userId];
    if (!profile) {
      return null;
    }

    return profile;
  }

  private getProfiles(): Observable<Models.IProfile[]> {
    const profilesRef = collection(this.firestore, PathConstants.PROFILES);
    return collectionData(profilesRef, { idField: 'id' }) as Observable<
      Models.IProfile[]
    >;
  }
}
