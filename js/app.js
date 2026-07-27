import { db } from "./firebase.js";

import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", async () => {

    const input = document.getElementById("name");
    const name = input.value.trim();

    if (!name) {
        alert("Masukkan nama peserta.");
        return;
    }

    try {

        const q = query(
            collection(db, "participants"),
            where("name", "==", name)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {

            localStorage.setItem("participantName", name);

            window.location.href = "lucky.html";

            return;
        }

        await addDoc(collection(db, "participants"), {

            name: name,
            luckyNumber: null,
            status: "waiting",
            createdAt: serverTimestamp()

        });

        localStorage.setItem("participantName", name);

        window.location.href = "lucky.html";

    } catch (err) {

        console.error(err);

        alert("Gagal menyimpan data.");

    }

});
