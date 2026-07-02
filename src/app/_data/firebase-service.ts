import { Injectable, signal } from '@angular/core';
import { getApp } from 'firebase/app';
import { getAuth, User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FIRESTORE_CONSTANTS } from './constants';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = getAuth();
  firestore = getFirestore(getApp(), FIRESTORE_CONSTANTS.DB_NAME);
  public currentUser = signal<User | null>(null);

  constructor() {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser.set(user);
    });
  }

}
