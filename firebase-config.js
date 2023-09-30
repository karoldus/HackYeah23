// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore-compat.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import firebase from "firebase/compat/app";
// // Required for side-effects
// import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWO8ei3KvnvajKNK1nYZsRUhaF4IOC0qM",
  authDomain: "hackyeah-smartcity.firebaseapp.com",
  projectId: "hackyeah-smartcity",
  storageBucket: "hackyeah-smartcity.appspot.com",
  messagingSenderId: "1012803374131",
  appId: "1:1012803374131:web:b6c05958e99a0039a0e746"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth(); // Ensure you have this line