import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Info } from './pages/info/info';
import { PatientList } from './pages/patient-list/patient-list';
import { PatientDetail } from './pages/patient-detail/patient-detail';
import { StaffList } from './pages/staff-list/staff-list';
import { StaffEdit } from './pages/staff-edit/staff-edit';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'patients', component: PatientList },
  { path: 'info', component: Info },
  { path: 'patient/:id', component: PatientDetail },
  { path: 'staffs', component: StaffList },
  { path: 'staff-edit/:id', component: StaffEdit },
];
