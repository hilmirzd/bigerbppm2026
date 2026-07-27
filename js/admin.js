import { db } from "./firebase.js";

import {

collection,
onSnapshot

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const tableBody =
document.getElementById("tableBody");

const totalParticipant =
document.getElementById("totalParticipant");

const usedNumber =
document.getElementById("usedNumber");

const remainingNumber =
document.getElementById("remainingNumber");

onSnapshot(

collection(db,"participants"),

(snapshot)=>{

tableBody.innerHTML="";

let no=1;

snapshot.forEach(doc=>{

const data=doc.data();

tableBody.innerHTML+=`

<tr>

<td>${no++}</td>

<td>${data.name}</td>

<td>${data.luckyNumber}</td>

<td>${new Date(data.createdAt.seconds*1000).toLocaleString()}</td>

</tr>

`;

});

totalParticipant.innerHTML=snapshot.size;

usedNumber.innerHTML=snapshot.size;

remainingNumber.innerHTML=100-snapshot.size;

}

);
