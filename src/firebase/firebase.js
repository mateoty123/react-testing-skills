// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCE81n5u8KcCHzliTu6jfIy_TpRxkY8PxY',
  authDomain: 'data-for-calendar.firebaseapp.com',
  projectId: 'data-for-calendar',
  storageBucket: 'data-for-calendar.appspot.com',
  messagingSenderId: '506311861162',
  appId: '1:506311861162:web:d2e7272da67fdd9f4a41d3',
  measurementId: 'G-1N50XBSVDD',
})

const auth = getAuth(firebaseApp)



onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    console.log('logged in!')
  } else {
    console.log('No user')
  }
})
