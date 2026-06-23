import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  query,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Patient {
  id?: string;

  name: string;
  citizenId: string;

  age?: number;
  gender?: string;
  date?: string;

  disease?: string;
  medicine?: string;
  note?: string;

  room?: string;
  price?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private firestore: Firestore) {}

  // เพิ่มผู้ป่วย
  addPatient(patient: Patient) {
    const ref = collection(this.firestore, 'patients');
    return addDoc(ref, patient);
  }

  // ดึงข้อมูลผู้ป่วยทั้งหมด
  getPatients(): Observable<Patient[]> {
    const ref = collection(this.firestore, 'patients');
    const q = query(ref);

    return collectionData(q, { idField: 'id' }) as Observable<Patient[]>;
  }

  // ดึงผู้ป่วยคนเดียว
  getPatient(id: string): Observable<Patient> {
    const ref = doc(this.firestore, 'patients', id);

    return docData(ref, { idField: 'id' }) as Observable<Patient>;
  }

  // ลบผู้ป่วย
  deletePatient(id: string) {
    const ref = doc(this.firestore, 'patients', id);

    return deleteDoc(ref);
  }
}