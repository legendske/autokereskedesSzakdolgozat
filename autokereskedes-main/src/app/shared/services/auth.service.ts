import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  updatePassword,
  UserCredential,
  updateProfile,
} from '@angular/fire/auth';

import { Injectable } from '@angular/core';
import { LoginData } from '../../features/auth/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null;

  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  get currentUser(): User | null {
    return this.user;
  }

  get hasPassword(): boolean {
    return this.currentUser?.providerData[0]?.providerId === 'password';
  }

  login({ email, password }: LoginData): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  register({ email, password }: LoginData): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  updatePassword(newPassword: string): Promise<void> {
    if (this.user) {
      return updatePassword(this.user, newPassword);
    }

    return new Promise(() => {
      throw new Error('error');
    });
  }

  updateProfile(displayName: string, phoneNumber: string): Promise<void> {
    if (this.user) {
      return updateProfile(this.user, { displayName, photoURL: phoneNumber });
    }

    return new Promise(() => {
      throw new Error('error');
    });
  }
}
