import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAWDIFsUx41pdIrv9BsskwHNAavZ4qHW_w",
  authDomain: "databasehospital-c0ec2.firebaseapp.com",
  projectId: "databasehospital-c0ec2",
  storageBucket: "databasehospital-c0ec2.firebasestorage.app",
  messagingSenderId: "558259308995",
  appId: "1:558259308995:web:5778baf50c03f62b799576",
  measurementId: "G-RR8TVVTKHD"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideFirebaseApp(() => initializeApp(firebaseConfig)),

    provideFirestore(() => getFirestore()),

    provideAuth(() => getAuth())
  ]
};