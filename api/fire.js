import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyB4kvYwRtiicyHnwXpxr9YqsbxwhzL5ImM",
    authDomain: "kmanage-12f9a.firebaseapp.com",
    databaseURL: "https://kmanage-12f9a.firebaseio.com",
    projectId: "kmanage-12f9a",
    storageBucket: "kmanage-12f9a.appspot.com",
    messagingSenderId: "56491932792",
    appId: "1:56491932792:web:75e04067c1d77aaadcc18d",
    measurementId: "G-JLY4SZN2EC"
  };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  
export default firebase;
  