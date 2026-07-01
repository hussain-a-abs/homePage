import { inject, Injectable, signal } from '@angular/core';
import { FirebaseService } from './firebase-service';
import { collection, DocumentReference, DocumentSnapshot, getDoc, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { FIRESTORE_CONSTANTS } from './constants';
import { Availability, Certification, Chip, Project } from './models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private fb = inject(FirebaseService);
  public projects = signal<Project[] | null>(null);
  public stackChips = signal<Chip[] | null>(null);
  public certs = signal<Certification[] | null>(null);
  public availability = signal<Availability | null>(null);

  async fetchProjects() {
    const collectionRef = collection(this.fb.firestore, FIRESTORE_CONSTANTS.PROJECTS_COLLECTION);
    const q = query(collectionRef, where('isLive', '==', true));
    let projs: Project[] = [];
    (await getDocs(q)).docs.forEach(doc => {
      let data = doc.data();
      projs.push({
        id: doc.id,
        title: data['title'] || "",
        subtitle: data['subtitle'] || "",
        displayType: data['displayType'] || "writeup",
        description: data['description'] || "",
        urlSlug: data['urlSlug'] || "",
        isLive: data['isLive'],
      })
    })

    this.projects.set(projs);
  }

  async fetchStackChips() {
    const collectionRef = collection(this.fb.firestore, FIRESTORE_CONSTANTS.STACK_COLLECTION);
    const q = query(collectionRef);
    let stack: Chip[] = [];
    (await getDocs(q)).docs.forEach(doc => {
      let data = doc.data();
      stack.push({
        id: doc.id,
        name: data['name']
      })
    })

    this.stackChips.set(stack);
  }

  async fetchCerts() {
    const collectionRef = collection(this.fb.firestore, FIRESTORE_CONSTANTS.CERTS_COLLECTION);
    const q = query(collectionRef);
    let certs: Certification[] = [];
    (await getDocs(q)).docs.forEach(doc => {
      let data = doc.data();
      certs.push({
        id: doc.id,
        title: data['title'],
        subtitle: data['subtitle'],
        chips: data['chips'] as Chip[],
        icon: data['icon'],
        date: data['date'],
        link: data['link'],
      })
    })

    this.certs.set(certs);

  }

  async fetchAvailability() {
    const collectionRef = collection(this.fb.firestore, FIRESTORE_CONSTANTS.WORK_AVAILABILITY_COLLECTION);
    const q = query(collectionRef);
    const doc = (await getDocs(q)).docs[0];

    this.availability.set({ ...doc.data(), id: doc.id } as unknown as Availability);

  }

  async getProjectByUrlSlug(slug: string) {
    const collectionRef = collection(this.fb.firestore, FIRESTORE_CONSTANTS.PROJECTS_COLLECTION);
    const q = query(collectionRef, where('urlSlug', '==', slug));
    const snapshot = await getDocs(q);
    return (snapshot.empty) ? null : { ...snapshot.docs[0].data(), id: snapshot.docs[0].id } as Project;
  }

}
