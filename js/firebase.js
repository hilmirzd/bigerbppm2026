import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDdlFtRGf0xkZMYLbU_YncTfMTniazxo0Y",
    authDomain: "biger-bppm-2026.firebaseapp.com",
    projectId: "biger-bppm-2026",
    storageBucket: "biger-bppm-2026.firebasestorage.app",
    messagingSenderId: "57601958744",
    appId: "1:57601958744:web:ba933e679e10a6589d7b2d",
    measurementId: "G-Y3E58GC4QY"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
