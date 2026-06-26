import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StaffService } from '../../services/staff.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  position = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private staffService: StaffService,
  ) {}

  ngOnInit() {
    const uid = this.authService.getCurrentUser()?.uid;

    if (!uid) return;

    this.staffService.getStaff(uid).subscribe((staff) => {
      this.position = staff.position;
    });
  }

   logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
