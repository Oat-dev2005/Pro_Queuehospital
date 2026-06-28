import { Component } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { Header } from '../../components/header/header';
import { Router } from '@angular/router';
import {
  Prescription,
  PrescriptService,
} from '../../services/prescript.service';
import { Queue, QueueService } from '../../services/queue.service';
import { MatDialog } from '@angular/material/dialog';
import { QrDialogal } from '../qr-dialogal/qr-dialogal';
import QRCode from 'qrcode';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, Header, CommonModule],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.scss',
})
export class PatientList {
  prescriptions$!: Observable<Prescription[]>;

  private searchTerm = new BehaviorSubject<string>('');

  constructor(
    private prescriptService: PrescriptService,
    private queueService: QueueService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.prescriptions$ = combineLatest([
      this.prescriptService.getPrescriptions(),
      this.searchTerm,
    ]).pipe(
      map(([prescriptions, search]) =>
        prescriptions.filter(
          (p) =>
            p.med_list.toLowerCase().includes(search.toLowerCase()) ||
            p.doctor_name.toLowerCase().includes(search.toLowerCase()),
        ),
      ),
    );
  }

  search(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.next(value);
  }

  openDetail(prescription: Prescription) {
    if (prescription.id) {
      this.router.navigate(['/patients', prescription.id]);
    }
  }

  async showQR(prescription: Prescription) {
    const queue = await this.queueService.getOrCreateQueue(
      prescription.patientId,
      prescription.prescriptionId
    );

    await this.openQrDialog(queue);
  }

  async openQrDialog(queue: Queue) {
    const queueUrl =
    `http://192.168.0.105:4200/queue/${queue.id}`;

    const qrImage = await QRCode.toDataURL(queueUrl);

    this.dialog.open(QrDialogal, {
      width: '400px',
      data: {
        qrImage,
        queueNumber: queue.q_order,
        status: queue.q_status,
      }
    });
    console.log('📌 QR URL =', queueUrl);
  }
}

