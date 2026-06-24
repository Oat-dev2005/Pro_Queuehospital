import { Component } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Header } from '../../components/header/header';
import { Staff, StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule, Header, NgFor, NgIf],
  templateUrl: './staff-list.html',
  styleUrl: './staff-list.scss',
})
export class StaffList {
  staffs$!: Observable<Staff[]>;
  private searchTerm = new BehaviorSubject<string>('');

  constructor(
    private staffService: StaffService,
    private router: Router,
  ) {
    this.staffs$ = combineLatest([
      this.staffService.getStaffs(),
      this.searchTerm,
    ]).pipe(
      map(([staffs, search]) => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) {
          return staffs;
        }

        return staffs.filter((staff) =>
          [
            staff.fullName,
            staff.citizenId,
            staff.email,
            staff.phone,
            staff.position,
          ]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(keyword)),
        );
      }),
    );
  }

  search(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.next(value);
  }

  editStaff(staff: Staff) {
    if (staff.id) {
      this.router.navigate(['/staff-edit', staff.id]);
    }
  }
}
