import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  query,
  docData,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Prescription {
  id?: string;
  prescriptionId: string;
  patientId: string;
  med_list: string;
  doctor_name: string;
  pay_status: string;
  cost: number;
  pre_date: string;
  note?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PrescriptService {
  constructor(private firestore: Firestore) {}

  // เพิ่มใบสั่งยา
  addPrescription(prescription: Prescription) {
    const ref = collection(this.firestore, 'prescriptions');
    return addDoc(ref, prescription);
  }

  // ดึงข้อมูลใบสั่งยาทั้งหมด
  getPrescriptions(): Observable<Prescription[]> {
    const ref = collection(this.firestore, 'prescriptions');
    const q = query(ref);
    return collectionData(q, { idField: 'id' }) as Observable<Prescription[]>;
  }

  // ดึงใบสั่งยาคนเดียว
  getPrescription(id: string): Observable<Prescription> {
    const ref = doc(this.firestore, 'prescriptions', id);
    return docData(ref, { idField: 'id' }) as Observable<Prescription>;
  }

  // อัปเดตใบสั่งยา
  updatePrescription(id: string, prescription: Partial<Prescription>) {
    const ref = doc(this.firestore, 'prescriptions', id);
    return updateDoc(ref, prescription);
  }
}
