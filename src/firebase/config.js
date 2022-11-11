import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAAHeOQInRXn_-PKp1oCfF1T5BgbdEN1Aw',
  authDomain: 'live-article.firebaseapp.com',
  projectId: 'live-article',
  storageBucket: 'live-article.appspot.com',
  messagingSenderId: '239894432206',
  appId: '1:239894432206:web:c91c6719ab37840245439f',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
