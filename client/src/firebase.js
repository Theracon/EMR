import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCe1DfCRnQlDSoOVOeRE1O9Ck-9tOra4Fg",
  authDomain: "e-med-records.firebaseapp.com",
  databaseURL:
    "https://e-med-records-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "e-med-records",
  storageBucket: "e-med-records.appspot.com",
  messagingSenderId: "144026144493",
  appId: "1:144026144493:web:34e4aa1e9715f4807b06e4",
  measurementId: "G-D20RF0J9RF",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
