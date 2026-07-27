<script type="module" src="js/app.js"></script>

import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const startBtn = document.getElementById("startBtn");

startBtn.onclick = async () => {

    const name = document.getElementById("name").value.trim();

    if(name===""){

        alert("Masukkan nama.");

        return;

    }

    const q = query(
        collection(db,"participants"),
        where("name","==",name)
    );

    const result = await getDocs(q);

    if(!result.empty){

        localStorage.setItem("participantName",name);

        location.href="lucky.html";

        return;

    }

    await addDoc(

        collection(db,"participants"),

        {

            name,

            luckyNumber:null,

            status:"waiting",

            createdAt:serverTimestamp()

        }

    );

    localStorage.setItem("participantName",name);

    location.href="lucky.html";

}
