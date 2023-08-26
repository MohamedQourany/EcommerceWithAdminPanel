// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUMDor-YX8jxXxQn_H3iANLrPGc3UkdqA",
  authDomain: "chat-app-ac030.firebaseapp.com",
  projectId: "chat-app-ac030",
  storageBucket: "chat-app-ac030.appspot.com",
  messagingSenderId: "764297914265",
  appId: "1:764297914265:web:98d3b9a274d4675381d508",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

export const analytics = getAnalytics(app);
logEvent(analytics, "goal_completion", { name: "lever_puzzle" });
