import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { Header } from '../../components/header/header';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [RouterModule, Header, FormsModule],
  templateUrl: './info.html',
  styleUrl: './info.scss'
})
export class Info {

  patient = {
    date: '',
    citizenId: '',
    name: '',
    gender: '',
    age: '',
    medicine: '',
    disease: '',
    note: ''
  };

  constructor(private firestore: Firestore) {}

  async savePatient() {

    const patientRef = collection(this.firestore, 'patients');

    await addDoc(patientRef, this.patient);

    alert("Saved successfully");

    console.log(this.patient);

  }

}