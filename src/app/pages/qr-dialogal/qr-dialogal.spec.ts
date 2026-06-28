import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrDialogal } from './qr-dialogal';

describe('QrDialogal', () => {
  let component: QrDialogal;
  let fixture: ComponentFixture<QrDialogal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrDialogal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrDialogal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
