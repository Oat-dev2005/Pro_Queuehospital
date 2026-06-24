import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Staff {
  id?: string;
  address: string;
  birthDate: string;
  citizenId: string;
  email: string;
  fullName: string;
  gender: string;
  password: string;
  phone: string;
  position: string;
}

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private readonly collectionName = 'staff';

  constructor(private firestore: Firestore) {}

  getStaffs(): Observable<Staff[]> {
    const ref = collection(this.firestore, this.collectionName);
    const q = query(ref);

    return collectionData(q, { idField: 'id' }) as Observable<Staff[]>;
  }

  getStaff(id: string): Observable<Staff> {
    const ref = doc(this.firestore, this.collectionName, id);

    return docData(ref, { idField: 'id' }) as Observable<Staff>;
  }

  updateStaff(id: string, staff: Partial<Staff>) {
    const ref = doc(this.firestore, this.collectionName, id);

    return updateDoc(ref, staff);
  }
}
