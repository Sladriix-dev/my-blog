import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIR622NJ39BBDJ8D-HcmZ3JCt_TcoiW18",

  authDomain: "my-blog-497b3.firebaseapp.com",

  projectId: "my-blog-497b3",

  storageBucket: "my-blog-497b3.appspot.com",

  messagingSenderId: "708140335576",

  appId: "1:708140335576:web:3802dbd91fefaadcb372ad",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
