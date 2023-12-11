import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kadai-outdoor-bd1c3.firebaseapp.com",
  projectId: "kadai-outdoor-bd1c3",
  storageBucket: "kadai-outdoor-bd1c3.appspot.com",
  messagingSenderId: "67788006257",
  appId: "1:67788006257:web:7ae743406d2bc86d940cd0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
