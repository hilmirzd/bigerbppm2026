import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    addDoc
}
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const btn = document.getElementById("drawWinner");


btn.addEventListener("click", async()=>{


    // Ambil semua peserta
    const pesertaSnap = await getDocs(
        collection(db,"participants")
    );


    let peserta = [];


    pesertaSnap.forEach((doc)=>{

        peserta.push({
            id:doc.id,
            ...doc.data()
        });

    });



    // Ambil daftar pemenang sebelumnya
    const winnerSnap = await getDocs(
        collection(db,"winners")
    );


    let winners = [];


    winnerSnap.forEach((doc)=>{

        winners.push(
            doc.data().nama
        );

    });



    // Filter peserta yang belum pernah menang
    let available = peserta.filter(
        p => !winners.includes(p.nama)
    );



    if(available.length === 0){

        document.getElementById("winnerName").innerHTML =
        "SEMUA PESERTA SUDAH MENANG";

        return;

    }



    // Random pemenang
    let winner =
    available[
        Math.floor(
            Math.random()*available.length
        )
    ];



    // Tampilkan pemenang
    document.getElementById("winnerName").innerHTML =
    `
    ${winner.nama}
    <br>
    <small>
    Lucky Number: ${winner.luckyNumber}
    </small>
    `;



    // Simpan ke Firebase
    await addDoc(
        collection(db,"winners"),
        {

            nama:winner.nama,

            luckyNumber:winner.luckyNumber,

            waktu:new Date()

        }
    );


});
