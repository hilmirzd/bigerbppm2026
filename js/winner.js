import { db } from "./firebase.js";

import {
collection,
getDocs,
addDoc
}
from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";



const btn =
document.getElementById("drawWinner");



btn.addEventListener(
"click",
async()=>{


const pesertaSnap =
await getDocs(
collection(db,"participants")
);



let peserta=[];


pesertaSnap.forEach(doc=>{

peserta.push({
id:doc.id,
...doc.data()
});

});



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



let available =
peserta.filter(
p=>!winners.includes(p.name)
);



if(available.length===0){

document.getElementById("winnerName")
.innerHTML="SEMUA SUDAH MENANG";

return;

}



let winner =
available[
Math.floor(
Math.random()*available.length
)
];



document.getElementById("winnerName")
.innerHTML=
winner.name;



await addDoc(
collection(db,"winners"),
{

name:winner.name,

number:winner.number,

time:new Date()

}

);


});
