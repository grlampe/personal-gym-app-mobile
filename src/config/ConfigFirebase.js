import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWZ9KxR866ByoWcc9MQXHbkkZHFzuHcQM",
  authDomain: "personal-gym-app-mobile.firebaseapp.com",
  projectId: "personal-gym-app-mobile",
  storageBucket: "personal-gym-app-mobile.appspot.com",
  messagingSenderId: "332630811919",
  appId: "1:332630811919:web:3baf076fb222f3892bca7a"
};

const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export {auth};