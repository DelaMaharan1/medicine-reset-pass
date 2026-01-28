import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAk9YnXheSII3q9SpMw3CuqzYJPuKo7aJ0",
    authDomain: "meditrack-c224d.firebaseapp.com",
    projectId: "meditrack-c224d",
    storageBucket: "meditrack-c224d.firebasestorage.app",
    messagingSenderId: "811966391838",
    appId: "1:811966391838:web:70a9af07a4bb365b2e300f",
    measurementId: "G-VNYHDJM0PY"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
