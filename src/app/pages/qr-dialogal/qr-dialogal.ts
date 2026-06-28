import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-qr-dialogal',
  imports: [],
  templateUrl: './qr-dialogal.html',
  styleUrl: './qr-dialogal.scss',
})
export class QrDialogal {
constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      qrImage: string;
      queueNumber: number;
    }
  ) {}

}
