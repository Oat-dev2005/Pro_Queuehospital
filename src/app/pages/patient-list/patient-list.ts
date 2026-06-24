import { Component } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { Header } from '../../components/header/header';
import { Router } from '@angular/router';
import {
  Prescription,
  PrescriptService,
} from '../../services/prescript.service';

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
      this.router.navigate(['/prescription', prescription.id]);
    }
  }

  showQR(prescription: Prescription) {
    alert('QR Code UI');
  }
}
