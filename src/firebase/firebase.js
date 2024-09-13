// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE81n5u8KcCHzliTu6jfIy_TpRxkY8PxY",
  authDomain: "data-for-calendar.firebaseapp.com",
  projectId: "data-for-calendar",
  storageBucket: "data-for-calendar.appspot.com",
  messagingSenderId: "506311861162",
  appId: "1:506311861162:web:d2e7272da67fdd9f4a41d3",
  measurementId: "G-1N50XBSVDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);