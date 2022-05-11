import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc4uPmiGfuxopmpLhhvgacSyoPVvcPqls",
  authDomain: "mybucket-list.firebaseapp.com",
  databaseURL: "https://mybucket-list-default-rtdb.firebaseio.com",
  projectId: "mybucket-list",
  storageBucket: "mybucket-list.appspot.com",
  messagingSenderId: "728483969524",
  appId: "1:728483969524:web:533ba23c7caa5187e4a1a1",
  measurementId: "G-WF399S0RCY",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const logOut = () => {
  return auth.signOut();
};
