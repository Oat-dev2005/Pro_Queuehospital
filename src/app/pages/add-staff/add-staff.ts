import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-add-staff',
  standalone: true,
  imports: [Header, FormsModule, RouterModule],
  templateUrl: './add-staff.html',
  styleUrl: './add-staff.scss',
})
export class AddStaff {
  fullName = '';
  s_citizenId = '';
  birthDate = '';
  gender = '';
  phone = '';
  email = '';
  address = '';
  password = '';
  confirmPassword = '';

  selectedFile: File | null = null;

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private auth: Auth,
    private router: Router,
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onAddStaff() {
    if (
      !this.email ||
      !this.fullName ||
      !this.s_citizenId ||
      !this.birthDate ||
      !this.gender ||
      !this.phone ||
      !this.password ||
      !this.confirmPassword
    ) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('รหัสผ่านไม่ตรงกัน');
      return;
    }

    try {
      const userCredential = await this.authService.register(
        this.email,
        this.password,
      );
      const sid = userCredential.user.uid;

      await setDoc(doc(this.firestore, 'staff', sid), {
        fullName: this.fullName,
        s_citizenId: this.s_citizenId,
        birthDate: this.birthDate,
        gender: this.gender,
        phone: this.phone,
        email: this.email,
        address: this.address,
        position: 'staff',
      });

      alert('เพิ่มข้อมูลเจ้าหน้าที่สำเร็จ');
      this.router.navigate(['/staffs']);
    } catch (error: any) {
      alert(error.message);
    }
  }
}
