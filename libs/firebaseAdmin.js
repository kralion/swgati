import {
  AppOptions,
  cert,
  getApp,
  getApps,
  initializeApp,
  ServiceAccount,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const credentials = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

const options = {
  credential: cert(credentials),
  databaseURL: process.env.FIREBASE_DATAURL,
};

function createFirebaseAdminApp(config) {
  if (getApps().length === 0) {
    return initializeApp(config, "Server-Firebase");
  } else {
    return getApp("Server-Firebase");
  }
}

const firebaseAdmin = createFirebaseAdminApp(options);

export const adminAuth = getAuth(firebaseAdmin);