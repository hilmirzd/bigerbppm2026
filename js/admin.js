import { db } from "./firebase.js";

import {
    collection,
    query,
    orderBy,
    onSnapshot,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const tableBody = document.getElementById("tableBody");
const totalParticipant = document.getElementById("totalParticipant");
const usedNumber = document.getElementById("usedNumber");
const remainingNumber = document.getElementById("remainingNumber");

const q = query(
    collection(db, "participants"),
    orderBy("createdAt", "asc")
);

onSnapshot(q, (snapshot) => {

    tableBody.innerHTML = "";

    totalParticipant.textContent = snapshot.size;
    usedNumber.textContent = snapshot.size;
    remainingNumber.textContent = 100 - snapshot.size;

    let no = 1;

    snapshot.forEach((docSnap) => {

        const data = docSnap.data();

        let waktu = "-";

        if (data.createdAt) {
            waktu = data.createdAt.toDate().toLocaleString("id-ID");
        }

        tableBody.innerHTML += `
            <tr>
                <td>${no++}</td>
                <td>${data.name}</td>
                <td><strong>${data.luckyNumber}</strong></td>
                <td>${waktu}</td>
            </tr>
        `;

    });

});
