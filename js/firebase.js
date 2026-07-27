// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Ganti dengan konfigurasi milikmu
const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
