import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc,
    runTransaction,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", async () => {

    console.count("START BUTTON");

    const name = document.getElementById("name").value.trim();


    if (!name) {
        alert("Masukkan nama peserta.");
        return;
    }

    try {

        // Cek apakah nama sudah pernah daftar
        const q = query(
            collection(db, "participants"),
            where("name", "==", name)
        );

        const existing = await getDocs(q);

        if (!existing.empty) {

            alert("Nama sudah terdaftar.");

            localStorage.setItem("participantName", name);

            window.location.href = "lucky.html";

            return;
        }

        // Ambil semua nomor yang sudah dipakai
        const snapshot = await getDocs(collection(db, "participants"));

        const usedNumbers = [];

        snapshot.forEach(doc => {
            usedNumbers.push(doc.data().luckyNumber);
        });

        // Cari nomor yang masih tersedia
        const availableNumbers = [];

        for (let i = 1; i <= 100; i++) {

            if (!usedNumbers.includes(i)) {

                availableNumbers.push(i);

            }

        }

        if (availableNumbers.length === 0) {

            alert("Lucky Number sudah habis.");

            return;

        }

        // Ambil satu nomor secara acak
        const luckyNumber =
            availableNumbers[
                Math.floor(Math.random() * availableNumbers.length)
            ];

        // Simpan ke Firestore
        await addDoc(collection(db, "participants"), {

            name: name,
            luckyNumber: luckyNumber,
            createdAt: serverTimestamp()

        });

        // Simpan ke browser
        localStorage.setItem("participantName", name);
        localStorage.setItem("luckyNumber", luckyNumber);

        // Pindah ke halaman hasil
        window.location.href = "lucky.html";

    } catch (error) {

        console.error(error);

        alert("Terjadi kesalahan.");

    }

});
