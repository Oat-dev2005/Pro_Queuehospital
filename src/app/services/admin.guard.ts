import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

export const adminGuard = async () => {
  const auth = inject(Auth);
  const firestore = inject(Firestore);
  const router = inject(Router);

  const admin = auth.currentUser;

  if (!admin) {
    return router.createUrlTree(['/login']);
  }

  const staffRef = doc(firestore, 'staff', admin.uid);
  const snapshot = await getDoc(staffRef);

  if (!snapshot.exists()) {
    return router.createUrlTree(['/login']);
  }

  const adminData = snapshot.data();

  if (adminData['position'] === 'admin') {
    return true;
  }

  return router.createUrlTree(['/patients']);
};
