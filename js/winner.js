import { db } from "./firebase.js";


import {

collection,

getDocs,

addDoc,

serverTimestamp

}

from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";




const btn =
document.getElementById("drawWinner");




btn.onclick = async()=>{


// ambil peserta

const pesertaSnap =
await getDocs(
collection(db,"participants")
);



let peserta=[];



pesertaSnap.forEach(doc=>{

peserta.push(
doc.data()
);

});





// ambil pemenang sebelumnya

const winnerSnap =
await getDocs(
collection(db,"winners")
);



let winners=[];



winnerSnap.forEach(doc=>{

winners.push(
doc.data().name
);

});





// hapus peserta yang sudah menang

const kandidat =
peserta.filter(
p=>!winners.includes(p.name)
);





if(kandidat.length===0){


document.getElementById("winnerName")
.innerHTML =
"SEMUA SUDAH MENANG";


return;


}






// random winner


const winner =

kandidat[
Math.floor(
Math.random()*kandidat.length
)
];





// tampilkan


document.getElementById("winnerName")
.innerHTML =

`
${winner.name}

<br>

<span style="font-size:20px">
Lucky Number : ${winner.luckyNumber}
</span>
`;







// simpan pemenang


await addDoc(

collection(db,"winners"),

{

name:winner.name,

luckyNumber:winner.luckyNumber,

wonAt:serverTimestamp()

}

);



};
