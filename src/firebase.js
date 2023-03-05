
//current problem: importing and connecting firebase correctly, we now have our firestore with the extra
//import statement, now we need full connection with our other variables auth an d storage
//to instantly link this function
// Import the functions you need from the SDKs you need
//import firebase from 'firebase'
//import firebase from 'firebase'

import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAoRqLwL6-sc1oHme4yzd-EJGGwpdFvB2s",
  authDomain: "instagram-clone-react-232e5.firebaseapp.com",
  projectId: "instagram-clone-react-232e5",
  storageBucket: "instagram-clone-react-232e5.appspot.com",
  messagingSenderId: "1014507602432",
  appId: "1:1014507602432:web:1d21560599084fbc4e0ee5",
  measurementId: "G-3KJJWB3XD1"
};




const firebaseApp = firebase.initializeApp( {

    apiKey: "AIzaSyAoRqLwL6-sc1oHme4yzd-EJGGwpdFvB2s",
    authDomain: "instagram-clone-react-232e5.firebaseapp.com",
    projectId: "instagram-clone-react-232e5",
    storageBucket: "instagram-clone-react-232e5.appspot.com",
    messagingSenderId: "1014507602432",
    appId: "1:1014507602432:web:1d21560599084fbc4e0ee5",
    measurementId: "G-3KJJWB3XD1"


})


//grabbing three services from firebase
//firebase loginusers, al lthrough usersl ogiinto firesbase different
//storage, firebase storage, firebase storage , amazing, clean code up 
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage= firebase.storage();

export {db, auth, storage};

