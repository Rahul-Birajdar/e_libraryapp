
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCUrhWH5frU_uTc9wMFQkHoyndLvaEaSg8",
    authDomain: "e-library2023.firebaseapp.com",
    databaseURL: "https://e-library2023-default-rtdb.firebaseio.com",
    projectId: "e-library2023",
    storageBucket: "e-library2023.appspot.com",
    messagingSenderId: "852683206255",
    appId: "1:852683206255:web:78b5f42d44a80e1711a79a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const storage = getStorage(app);
export {auth};