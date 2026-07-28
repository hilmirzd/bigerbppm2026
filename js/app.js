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

    const name = document.getElementById("name").value.trim();

    if (!name) {
        alert("Masukkan nama peserta.");
        return;
    }

    startBtn.disabled = true;
    startBtn.innerText = "Memproses...";

    try {

        const participantRef = doc(db, "participants", name);

        const participantSnap = await getDoc(participantRef);

        if (participantSnap.exists()) {

            const data = participantSnap.data();

            localStorage.setItem("participantName", data.name);
            localStorage.setItem("luckyNumber", data.luckyNumber);

            location.href = "lucky.html";

            return;
        }

        const lotteryRef = doc(db, "config", "lottery");

        const luckyNumber = await runTransaction(db, async (transaction) => {

            const lotterySnap = await transaction.get(lotteryRef);

            if (!lotterySnap.exists()) {
                throw new Error("Lottery belum diinitialize.");
            }

            const numbers = lotterySnap.data().availableNumbers;

            if (numbers.length === 0) {
                throw new Error("Lucky Number sudah habis.");
            }

            const randomIndex = Math.floor(Math.random() * numbers.length);

            const number = numbers[randomIndex];

            numbers.splice(randomIndex, 1);

            transaction.update(lotteryRef, {
                availableNumbers: numbers
            });

            transaction.set(participantRef, {
                name: name,
                luckyNumber: number,
                createdAt: serverTimestamp()
            });

            return number;

        });

        localStorage.setItem("participantName", name);
        localStorage.setItem("luckyNumber", luckyNumber);

        location.href = "lucky.html";

    } catch (err) {

        console.error(err);

        alert(err.message);

        startBtn.disabled = false;
        startBtn.innerText = "DAFTAR";

    }

});
