import { db } from "./firebase.js";

import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// =========================
// ELEMENT
// =========================

const tableBody = document.getElementById("tableBody");
const totalParticipant = document.getElementById("totalParticipant");
const usedNumber = document.getElementById("usedNumber");
const remainingNumber = document.getElementById("remainingNumber");

const initBtn = document.getElementById("initBtn");

// =========================
// INITIALIZE 1-60
// =========================

initBtn.addEventListener("click", async () => {

    if (!confirm("Initialize Lucky Number 1-60 ?")) return;

    const numbers = [];

    for (let i = 1; i <= 60; i++) {
        numbers.push(i);
    }

    await setDoc(
        doc(db, "config", "lottery"),
        {
            availableNumbers: numbers
        }
    );

    alert("Initialize berhasil.");

});

// =========================
// TABLE
// =========================

const q = query(
    collection(db, "participants"),
    orderBy("createdAt", "asc")
);

onSnapshot(q, (snapshot) => {

    tableBody.innerHTML = "";

    totalParticipant.textContent = snapshot.size;
    usedNumber.textContent = snapshot.size;
    remainingNumber.textContent = 60 - snapshot.size;

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
