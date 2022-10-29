import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAAHeOQInRXn_-PKp1oCfF1T5BgbdEN1Aw',
  authDomain: 'live-article.firebaseapp.com',
  projectId: 'live-article',
  storageBucket: 'live-article.appspot.com',
  messagingSenderId: '239894432206',
  appId: '1:239894432206:web:c91c6719ab37840245439f',
};

export const app = initializeApp(firebaseConfig);
