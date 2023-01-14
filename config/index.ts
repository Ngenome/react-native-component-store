// firebase config
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnp6MesniSQ2WJU9uYSauwJ1vpA1cz-9Y",
  authDomain: "codesimpl-e74e3.firebaseapp.com",
  projectId: "codesimpl-e74e3",
  storageBucket: "codesimpl-e74e3.appspot.com",
  messagingSenderId: "722779684963",
  appId: "1:722779684963:web:07e409e0ecbfbfa06e3856",
  measurementId: "G-ESWDX78W99",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
