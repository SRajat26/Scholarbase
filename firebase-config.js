   import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
    import { getAuth } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
   import { getFirestore, collection, doc, getDoc, getDocs, setDoc } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

   const firebaseConfig = {
  apiKey: "AIzaSyCVOmKE00f5TvXJvev6b78t14X1b6B53pQ",
  authDomain: "scholarbase-e9bb2.firebaseapp.com",
  projectId: "scholarbase-e9bb2",
  storageBucket: "scholarbase-e9bb2.firebasestorage.app",
  messagingSenderId: "1045749849331",
  appId: "1:1045749849331:web:9e5a60df4a26f9d5e7ab86",
  measurementId: "G-VDN4T76P3R"
};

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db= getFirestore(app);
    export { collection, getDocs, doc, getDoc, setDoc };