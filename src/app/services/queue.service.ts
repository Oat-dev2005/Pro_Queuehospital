import { Injectable } from '@angular/core';
import { orderBy, limit, Timestamp } from '@angular/fire/firestore';

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  docData,
  updateDoc,
  query,
  where,
  runTransaction,
} from '@angular/fire/firestore';


import { firstValueFrom, Observable } from 'rxjs';

export interface Queue {
  id?: string;

  patientId: string;

  prescriptionId: string;

  q_order: number;

  q_status: 'กำลังจัดเตรียมยา' | 'จัดเตรียมยาเสร็จสิ้น' | 'รับยาเรียบร้อย';

  counter?: string;

  service_date: Timestamp;

}

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  constructor(private firestore: Firestore) {}

  addQueue(queue: Queue) {
    const ref = collection(this.firestore, 'queue');

    return addDoc(ref, queue);
  }

  getQueues(): Observable<Queue[]> {
    const ref = collection(this.firestore, 'queue');
    

    return collectionData(ref, {
      idField: 'id',
    }) as Observable<Queue[]>;
  }

  getQueue(id: string): Observable<Queue> {
    const ref = doc(this.firestore, 'queue', id);

    return docData(ref, {
      idField: 'id',
    }) as Observable<Queue>;
  }

  updateQueue(id: string, queue: Partial<Queue>) {
    const ref = doc(this.firestore, 'queue', id);

    return updateDoc(ref, queue);
  }

  async createQueue(patientId: string, prescriptionId: string) {
    const order = await this.getNextQueueOrder();

    return this.addQueue({
      patientId,
      prescriptionId,
      q_order: order,
      q_status: 'กำลังจัดเตรียมยา',
      counter: '',
      service_date: Timestamp.now(),
    });

  }

  getQueueByPrescriptionId(prescriptionId: string): Observable<Queue[]> {
    const ref = collection(this.firestore, 'queue');

    const q = query(
        ref,
        where('prescriptionId', '==', prescriptionId)
    );

    return collectionData(q, {
        idField: 'id',
    }) as Observable<Queue[]>;
    }

  async getNextQueueOrder(): Promise<number> {

    const counterRef = doc(this.firestore, 'queue_counter', 'current');

    return runTransaction(this.firestore, async (transaction) => {

        const counterDoc = await transaction.get(counterRef);

        if (!counterDoc.exists()) {
        throw new Error('Queue Counter ไม่พบ');
        }

        const data = counterDoc.data();

        const nextQueue = (data['lastQueue'] ?? 0) + 1;

        transaction.update(counterRef, {
        lastQueue: nextQueue,
        });

        return nextQueue;
    });
    }

    async getOrCreateQueue(
        patientId: string,
        prescriptionId: string
      ): Promise<Queue> {

        let queues = await firstValueFrom(
          this.getQueueByPrescriptionId(prescriptionId)
        );

        if (queues.length === 0) {

          await this.createQueue(patientId, prescriptionId);

          queues = await firstValueFrom(
            this.getQueueByPrescriptionId(prescriptionId)
          );
        }

        return queues[0];
      }
}