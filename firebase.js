// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD51nkbLj6GsLVGbK4lI1V65okrdCc_9Uc",
  authDomain: "news-app-a6853.firebaseapp.com",
  projectId: "news-app-a6853",
  storageBucket: "news-app-a6853.appspot.com",
  messagingSenderId: "774947830285",
  appId: "1:774947830285:web:ba1aad0734f3132829b344",
  measurementId: "G-FN1FEQH4WF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db = getFirestore(app);