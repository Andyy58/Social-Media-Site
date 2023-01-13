// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1SnGvwbuHw5_pDZ-M4uF_f5KDDJaa2Jo",
  authDomain: "react-course-659a3.firebaseapp.com",
  projectId: "react-course-659a3",
  storageBucket: "react-course-659a3.appspot.com",
  messagingSenderId: "761653476236",
  appId: "1:761653476236:web:be3949d231823e729674a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)