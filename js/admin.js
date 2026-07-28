import { db } from "./firebase.js";

import {
    collection,
    query,
    orderBy,
    onSnapshot,
    getDocs,
    deleteDoc,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



const tableBody = document.getElementById("tableBody");

const totalParticipant =
document.getElementById("totalParticipant");

const usedNumber =
document.getElementById("usedNumber");

const remainingNumber =
document.getElementById("remainingNumber");


const resetBtn =
document.getElementById("resetBtn");


const winnerBtn =
document.getElementById("winnerBtn");





/* =====================
   LOAD DATA PESERTA
===================== */


const q = query(
    collection(db,"participants"),
    orderBy("createdAt","asc")
);



onSnapshot(q,(snapshot)=>{


    tableBody.innerHTML="";


    totalParticipant.innerHTML =
    snapshot.size;


    usedNumber.innerHTML =
    snapshot.size;


    remainingNumber.innerHTML =
    60 - snapshot.size;



    let no=1;



    snapshot.forEach(docSnap=>{


        const data =
        docSnap.data();



        let waktu="-";



        if(data.createdAt){

            waktu =
            data.createdAt
            .toDate()
            .toLocaleString("id-ID");

        }



        tableBody.innerHTML += `

        <tr>

        <td>${no++}</td>

        <td>${data.name}</td>

        <td>
        <b>${data.luckyNumber}</b>
        </td>

        <td>${waktu}</td>

        </tr>

        `;


    });


});







/* =====================
 RESET SEMUA DATA
===================== */


resetBtn.onclick = async()=>{


    const yakin =
    confirm(
    "Hapus semua peserta dan reset nomor?"
    );


    if(!yakin)
    return;



    const snapshot =
    await getDocs(
        collection(db,"participants")
    );



    for(const item of snapshot.docs){


        await deleteDoc(

            doc(
            db,
            "participants",
            item.id
            )

        );


    }





    // reset lucky number 1-60


    const numbers=[];



    for(let i=1;i<=60;i++){

        numbers.push(i);

    }



    await setDoc(

        doc(
        db,
        "config",
        "lottery"
        ),

        {

        availableNumbers:numbers

        }

    );



    alert(
    "Reset berhasil"
    );


};







/* =====================
 MENU UNDIA PEMENANG
===================== */


winnerBtn.onclick = ()=>{


    window.location.href =
    "winner.html";


};
