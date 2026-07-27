import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const startBtn = document.getElementById("startBtn");

startBtn.onclick = async () => {

    const name = document.getElementById("name").value.trim();

    if(name===""){

        alert("Masukkan nama");

        return;

    }

    await addDoc(

        collection(db,"participants"),

        {

            name:name,

            luckyNumber:null,

            createdAt:serverTimestamp()

        }

    );

    localStorage.setItem("participantName",name);

    location.href="lucky.html";

}
