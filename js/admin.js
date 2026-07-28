import { db } from "./firebase.js";

import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc
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

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", async () => {

    const yakin = confirm(
        "Yakin ingin menghapus seluruh peserta?"
    );

    if (!yakin) return;

    const snapshot = await getDocs(collection(db, "participants"));

    const promises = [];

    snapshot.forEach((item) => {
        promises.push(deleteDoc(doc(db, "participants", item.id)));
    });

    await Promise.all(promises);

    alert("Semua data berhasil dihapus.");

});

const initBtn = document.getElementById("initBtn");

initBtn.addEventListener("click", async () => {

    const ok = confirm(
        "Initialize Lucky Number 1-60?"
    );

    if (!ok) return;

    const numbers = [];

    for (let i = 1; i <= 60; i++) {
        numbers.push(i);
    }

    await updateDoc(
        doc(db, "config", "lottery"),
        {
            availableNumbers: numbers
        }
    );

    alert("Lucky Number berhasil diinitialize.");

});
