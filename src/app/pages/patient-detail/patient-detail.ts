import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService, Patient } from '../../services/patient.service';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports:[CommonModule, Header],
  templateUrl: './patient-detail.html',
  styleUrl: './patient-detail.scss'
})
export class PatientDetail {

  patient!: Patient;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ){

    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.patientService.getPatient(id)
      .subscribe((data: Patient) => {
        this.patient = data;
      });
    }

  }

}