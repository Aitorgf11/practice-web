import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
//For upload picture
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDwUCP-ztG21fAvIsQwu_PW9hBcGoZixQA",
  authDomain: "react-shop-login.firebaseapp.com",
  databaseURL: "https://react-shop-login-default-rtdb.firebaseio.com",
  projectId: "react-shop-login",
  storageBucket: "react-shop-login.appspot.com",
  messagingSenderId: "426452751414",
  appId: "1:426452751414:web:15717b196947d79b7a3497"
};

const fireDB = firebase.initializeApp(firebaseConfig);
export default fireDB.database().ref();

//Authentication
const auth = getAuth();
//Storage
const storage = getStorage();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook for authentication
export function useAuth() {
  //For getting the current user logged
  const [ currentUser, setCurrentUser ] = useState();

  useEffect(() => {
    //Subcribe to this listener, every time the hook is mounted
    //Once is unmounted, we will unsubscribe
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

// Storage of firebase
// Each user have their own profile photo
// Async function because upload photos takes time
export async function upload(file, currentUser, setLoading) {
  //For creating a referencia and an unique id of img for each user
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  //Where should firebase should put the file, and file parameter
  const snapshot = await uploadBytes(fileRef, file);

  //For use photos or URL's
  const photoURL = await getDownloadURL(fileRef);

  //Updated the profile of each user
  updateProfile(currentUser, {photoURL});
  
  setLoading(false);

  toast.success("Uploaded file!");
  //alert("Uploaded file!");
}
