import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  fullName = '';
  citizenId = '';
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

  async onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('รหัสผ่านไม่ตรงกัน');
      return;
    }

    try {
      const userCredential = await this.authService.register(
        this.email,
        this.password,
      );
      const uid = userCredential.user.uid;

      await setDoc(doc(this.firestore, 'staff', uid), {
        fullName: this.fullName,
        citizenId: this.citizenId,
        birthDate: this.birthDate,
        gender: this.gender,
        phone: this.phone,
        email: this.email,
        address: this.address,
        role: 'admin',
      });

      alert('สมัครสมาชิกสำเร็จ');
      this.router.navigate(['/login']);
    } catch (error: any) {
      alert(error.message);
    }
  }
}
