// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG53jbweKcVjQUoq0drHaQcK6xKBp3cvo",
  authDomain: "posting-29a04.firebaseapp.com",
  projectId: "posting-29a04",
  storageBucket: "posting-29a04.appspot.com",
  messagingSenderId: "180473337604",
  appId: "1:180473337604:web:e1ae99c88d8d9497eae251",
  measurementId: "G-777Q5DRCZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// export const auth = getAuth();
// export const provider = new GoogleAuthProvider();

// Export the initialized Firebase app and analytics
export { app, db };
