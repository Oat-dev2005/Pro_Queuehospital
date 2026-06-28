import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Queue, QueueService } from '../../services/queue.service';

@Component({
  selector: 'app-patient-queue',
  imports: [CommonModule],
  templateUrl: './patient-queue.html',
  styleUrl: './patient-queue.scss',
})
export class PatientQueue {
  queue?: Queue;

  constructor(
    private route: ActivatedRoute,
    private queueService: QueueService
  ) {
    const id = this.route.snapshot.paramMap.get('id');

  console.log('🔥 PARAM ID FROM URL =', id); // 👈 เพิ่มตรงนี้

  if (id) {
    this.queueService.getQueue(id).subscribe({
      next: (data) => {
        console.log('✅ QUEUE DATA =', data); // 👈 เพิ่มตรงนี้
        this.queue = data;
      },
      error: (err) => {
        console.log('❌ FIRESTORE ERROR =', err); // 👈 เพิ่มตรงนี้
      }
    });
  } else {
    console.log('❌ id is null (route problem)');
  }
  }
}
