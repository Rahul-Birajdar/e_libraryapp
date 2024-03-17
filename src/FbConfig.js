import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Added

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBO3Y_-7HvXxT9hjtZgnwg20PcD8ZQlWfc",
    authDomain: "e-library-77143.firebaseapp.com",
    projectId: "e-library-77143",
    storageBucket: "e-library-77143.appspot.com",
    messagingSenderId: "599247874650",
    appId: "1:599247874650:web:95b5617a29e5535830c663"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app); // Added

export const storage = getStorage(app);
export { auth, db }; // Exporting database alongside storage and authentication
