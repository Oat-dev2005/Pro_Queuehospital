import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

export const staffGuard = async () => {
  const auth = inject(Auth);
  const firestore = inject(Firestore);
  const router = inject(Router);

  const staff = auth.currentUser;

  if (!staff) {
    return router.createUrlTree(['/login']);
  }

  const staffRef = doc(firestore, 'staff', staff.uid);
  const snapshot = await getDoc(staffRef);

  if (!snapshot.exists()) {
    return router.createUrlTree(['/login']);
  }

  const staffData = snapshot.data();

  if (staffData['position'] === 'staff') {
    return true;
  }

  return router.createUrlTree(['/staffs']);
};
