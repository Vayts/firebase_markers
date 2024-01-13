import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import * as process from 'process';

const firebaseConfig = {
  apiKey: process.env.REACT_API_KEY,
  authDomain: 'test-task-c3324.firebaseapp.com',
  projectId: 'test-task-c3324',
  storageBucket: 'test-task-c3324.appspot.com',
  messagingSenderId: '336373710692',
  appId: '1:336373710692:web:d3c0dd9deb975c37700471',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
