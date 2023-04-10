import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGXpdt7CNhVHwRpOLp2_E4Ws1a19TaEdg",
  authDomain: "hamiservices-f3ce8.firebaseapp.com",
  databaseURL: "https://hamiservices-f3ce8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hamiservices-f3ce8",
  storageBucket: "hamiservices-f3ce8.appspot.com",
  messagingSenderId: "125206103894",
  appId: "1:125206103894:web:3a91c6b651870c79b1b8f7",
  measurementId: "G-NXD7Q3Z5DB"
};
  
  const app = initializeApp(firebaseConfig);

export default app