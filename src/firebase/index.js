import firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCLtNr_m0h46JDeMLMWkleqyHl3sE6cp8I',
  authDomain: 'hyouka-7f4fb.firebaseapp.com',
  databaseURL: 'https://hyouka-7f4fb.firebaseio.com',
  projectId: 'hyouka-7f4fb',
  storageBucket: '',
  messagingSenderId: '693458420693',
  appId: '1:693458420693:web:f9059304d3be7e0730f35c',
};
firebase.initializeApp(firebaseConfig);

export const Firestore = firebase.firestore();
export default firebase;

// apiKey: "AIzaSyCLtNr_m0h46JDeMLMWkleqyHl3sE6cp8I",
// authDomain: "hyouka-7f4fb.firebaseapp.com",
// databaseURL: "https://hyouka-7f4fb.firebaseio.com",
// projectId: "hyouka-7f4fb",
// storageBucket: "",
// messagingSenderId: "693458420693",
// appId: "1:693458420693:web:f9059304d3be7e0730f35c",
// measurementId: "G-89WVZNDY93"
