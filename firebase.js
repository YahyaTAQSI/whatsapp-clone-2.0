import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyArqYOyxWrITuaY0jUsj_MZ95n0d56svI8",
  authDomain: "todo-app-f3a7e.firebaseapp.com",
  projectId: "todo-app-f3a7e",
  storageBucket: "todo-app-f3a7e.appspot.com",
  messagingSenderId: "205120210063",
  appId: "1:205120210063:web:2987905ebda158ac2b1cfa",
  measurementId: "G-EDV9ESETYW"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
