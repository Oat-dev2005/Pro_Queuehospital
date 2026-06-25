import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string | undefined;

  constructor(
    private authService: AuthService,
    private staffService: StaffService,
    private router: Router,
  ) {}

  // onLogin() {
  //   this.authService
  //     .login(this.email, this.password)
  //     .then(() => {
  //       alert('เข้าสู่ระบบสำเร็จ');
  //       this.router.navigate(['/patients']);
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // }
  onLogin() {
    if (!this.email || !this.password) {
      // this.errorMessage = 'กรุณากรอกอีเมลและรหัสผ่าน';
      alert('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }

    this.authService.login(this.email, this.password).then(() => {
      // ✅ ดึง UID จาก Firebase Auth
      const sid = this.authService.getCurrentUser()?.uid;
      // ✅ ต้องเช็ค
      if (!sid) {
        this.errorMessage = 'ไม่พบบัญชีผู้ใช้นี้';
        this.authService.logout();
        return;
      }

      // ✅ เข้าถึง document โดยตรง (ไม่ต้อง query)
      this.staffService.getStaff(sid).subscribe((staff) => {
        if (staff.position === 'staff') {
          this.router.navigate(['/patients']);
        } else if (staff.position === 'admin') {
          this.router.navigate(['/staffs']);
        }
      });
    });
  }
}
