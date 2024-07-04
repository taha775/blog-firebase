import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDLb7jMO7Rbb-RQq-ec4rP1Th_wGI_k10s",
    authDomain: "beblogs-92322.firebaseapp.com",
    databaseURL: "https://beblogs-92322-default-rtdb.firebaseio.com",
    projectId: "beblogs-92322",
    storageBucket: "beblogs-92322.appspot.com",
    messagingSenderId: "305659012453",
    appId: "1:305659012453:web:7ecbfe2a2ba1fee264ed8c"
  };
  

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  export { auth, db, storage };