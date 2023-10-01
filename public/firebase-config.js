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