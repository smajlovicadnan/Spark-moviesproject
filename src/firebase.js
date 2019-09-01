import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/messaging'


const firebaseConfig = {
  
    apiKey: "AIzaSyAy4z_Z1IW7cP0vfAB-s6v8b4xkGuiKO3E",
    authDomain: "movie-e5a42.firebaseapp.com",
    databaseURL: "https://movie-e5a42.firebaseio.com",
    projectId: "movie-e5a42",
    storageBucket: "movie-e5a42.appspot.com",
    messagingSenderId: "279586430510",
    appId: "1:279586430510:web:97d237930b841c1f"} ;
  
firebase.initializeApp(firebaseConfig);
  
export default{firebase}

