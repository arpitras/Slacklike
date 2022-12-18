// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getFirestore} from 'firebase/firestore/lite';
import { collection, addDoc } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLsBZG7LhJDDoJsbfADBdhsE4X56v3nKc",
  authDomain: "steam-thinker-320713.firebaseapp.com",
  projectId: "steam-thinker-320713",
  storageBucket: "steam-thinker-320713.appspot.com",
  messagingSenderId: "44481051348",
  appId: "1:44481051348:web:b0b587f86c1952f2f01941",
  measurementId: "G-94015JD6WE"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, db, collection, addDoc, provider };