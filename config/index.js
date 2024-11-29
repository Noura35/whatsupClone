// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClKbto-t49tMvHvoEdIGVk5aYGaj-05tU",
  authDomain: "gestion-de-profils.firebaseapp.com",
  projectId: "gestion-de-profils",
  storageBucket: "gestion-de-profils.appspot.com", // corrected storage bucket URL
  messagingSenderId: "1050262839732",
  appId: "1:1050262839732:web:36115a8d2e06ebf47c52e1",
  measurementId: "G-WWGX79H6WE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exporter les instances pour les utiliser ailleurs
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app); // Exporter Realtime Database



