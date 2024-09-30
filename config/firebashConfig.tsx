// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-kids-story-builder-5787d.firebaseapp.com",
  projectId: "ai-kids-story-builder-5787d",
  storageBucket: "ai-kids-story-builder-5787d.appspot.com",
  messagingSenderId: "358068392024",
  appId: "1:358068392024:web:f6c3a57c3313a43dfc7a2d",
  measurementId: "G-9NM4ESH66D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
