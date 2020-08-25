import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyApL8S_ScD8-d3098l-1WQHnthYNazIccc",
  authDomain: "whats-app-clone-82ad9.firebaseapp.com",
  databaseURL: "https://whats-app-clone-82ad9.firebaseio.com",
  projectId: "whats-app-clone-82ad9",
  storageBucket: "whats-app-clone-82ad9.appspot.com",
  messagingSenderId: "951150818829",
  appId: "1:951150818829:web:77ee33e44ee3254a400744",
  measurementId: "G-0P8ZJS2V8E"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;