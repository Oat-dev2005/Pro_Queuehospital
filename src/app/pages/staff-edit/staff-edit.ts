import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../../components/header/header';
import { Staff, StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-staff-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './staff-edit.html',
  styleUrl: './staff-edit.scss',
})
export class StaffEdit {
  staffId = '';
  saving = false;
  staff: Staff = {
    address: '',
    birthDate: '',
    citizenId: '',
    email: '',
    fullName: '',
    gender: '',
    password: '',
    phone: '',
    position: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private staffService: StaffService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.staffId = id;
      this.staffService.getStaff(id).subscribe((staff) => {
        this.staff = {
          ...this.staff,
          ...staff,
        };
      });
    }
  }

  async saveStaff() {
    if (!this.staffId) {
      return;
    }

    this.saving = true;

    try {
      const { id, ...staffData } = this.staff;
      await this.staffService.updateStaff(this.staffId, staffData);
      alert('Staff updated successfully');
      this.router.navigate(['/staffs']);
    } catch (error: any) {
      alert(error.message);
    } finally {
      this.saving = false;
    }
  }

  cancel() {
    this.router.navigate(['/staffs']);
  }
}
