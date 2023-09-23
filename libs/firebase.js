// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  setPersistence
} from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//Config Original
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeFirestore(app, {
  ignoreUndefinedProperties: true
});

const db = getFirestore(app);

export const storage = getStorage();

export const auth = getAuth();

setPersistence(auth, browserLocalPersistence);

export default db;
