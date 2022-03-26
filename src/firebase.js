// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtCmQ_Xr7lDimM-4cFiu0QW-JZ81MPwwk",
  authDomain: "react-todo-5ded9.firebaseapp.com",
  projectId: "react-todo-5ded9",
  storageBucket: "react-todo-5ded9.appspot.com",
  messagingSenderId: "400947308658",
  appId: "1:400947308658:web:f5acf6d5ab8e43e46ebaeb",
  measurementId: "G-VPP3L325ZY",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
