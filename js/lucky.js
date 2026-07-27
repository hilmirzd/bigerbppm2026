import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    query
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const participantName = document.getElementById("participantName");
const numberDisplay = document.getElementById("numberDisplay");
const drawBtn = document.getElementById("drawBtn");

participantName.textContent =
    localStorage.getItem("participantName") || "Peserta";

drawBtn.onclick = async () => {

    drawBtn.disabled = true;

    const snapshot = await getDocs(
        query(collection(db, "participants"))
    );

    const usedNumbers = [];

    snapshot.forEach(doc => {

        usedNumbers.push(doc.data().luckyNumber);

    });

    const available = [];

    for(let i=1;i<=100;i++){

        if(!usedNumbers.includes(i)){

            available.push(i);

        }

    }

    if(available.length===0){

        alert("Nomor sudah habis.");

        return;

    }

    let interval = setInterval(()=>{

        numberDisplay.innerHTML =
        Math.floor(Math.random()*100+1)
        .toString()
        .padStart(2,"0");

    },60);

    setTimeout(async()=>{

        clearInterval(interval);

        const lucky =
        available[
            Math.floor(Math.random()*available.length)
        ];

        numberDisplay.innerHTML =
        lucky.toString().padStart(2,"0");

        confetti({

            particleCount:250,
            spread:150

        });

        await addDoc(
            collection(db,"participants"),
            {

                name:
                participantName.textContent,

                luckyNumber:lucky,

                createdAt:new Date()

            }
        );

        drawBtn.innerHTML="SELESAI";

    },3000);

}
