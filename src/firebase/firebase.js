// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9fByMZfUqWQG14PsMFIUaCDAqMRuv6HA",
  authDomain: "movie-site-4d94d.firebaseapp.com",
  projectId: "movie-site-4d94d",
  storageBucket: "movie-site-4d94d.appspot.com",
  messagingSenderId: "109613003942",
  appId: "1:109613003942:web:dde693b61f1c9afb21b067"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");
export default app;