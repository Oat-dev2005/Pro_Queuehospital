import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AddStaff } from './pages/add-staff/add-staff';
import { Info } from './pages/info/info';
import { PatientList } from './pages/patient-list/patient-list';
import { PatientDetail } from './pages/patient-detail/patient-detail';
import { StaffList } from './pages/staff-list/staff-list';
import { StaffEdit } from './pages/staff-edit/staff-edit';
import { adminGuard } from './services/admin.guard';
import { staffGuard } from './services/staff.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'addstaff', component: AddStaff, canActivate: [adminGuard] },
  { path: 'patients', component: PatientList, canActivate: [staffGuard] },
  { path: 'info', component: Info, canActivate: [staffGuard] },
  { path: 'patient/:id', component: PatientDetail, canActivate: [staffGuard] },
  { path: 'staffs', component: StaffList, canActivate: [adminGuard] },
  { path: 'staff-edit/:id', component: StaffEdit, canActivate: [adminGuard] },
  {
    path: '**',
    redirectTo: 'login',
  },
];
