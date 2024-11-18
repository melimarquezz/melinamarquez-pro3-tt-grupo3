import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAg7Q6a_umwpF1SAP2qcCrYkXhQTv_cKtA",
  authDomain: "proyectointegrador2-grupo3.firebaseapp.com",
  projectId: "proyectointegrador2-grupo3",
  storageBucket: "proyectointegrador2-grupo3.firebasestorage.app",
  messagingSenderId: "625275184049",
  appId: "1:625275184049:web:6690585c5d2f2cd9c59390"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
