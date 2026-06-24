import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffEdit } from './staff-edit';

describe('StaffEdit', () => {
  let component: StaffEdit;
  let fixture: ComponentFixture<StaffEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
