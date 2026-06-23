import { Component } from '@angular/core';
import { PatientService, Patient } from '../../services/patient.service';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { Header } from '../../components/header/header';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, Header, CommonModule],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.scss'
})
export class PatientList {

  patients$!: Observable<Patient[]>;

  private searchTerm = new BehaviorSubject<string>('');

  constructor(
    private patientService: PatientService,
    private router: Router
  ) {

    this.patients$ = combineLatest([
      this.patientService.getPatients(),
      this.searchTerm
    ]).pipe(
      map(([patients, search]) =>
        patients.filter(p =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    );

  }

  search(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.next(value);
  }

  openDetail(patient: Patient){
    if(patient.id){
      this.router.navigate(['/patient', patient.id]);
    }
  }

  deletePatient(id:string){
    if(confirm("ต้องการยกเลิกคิวนี้หรือไม่ ?")){
      this.patientService.deletePatient(id);
    }
  }

  showQR(patient: Patient){
    alert("QR Code UI");
  }

}