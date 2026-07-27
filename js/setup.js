import { db } from "./firebase.js";

import {

doc,
setDoc

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

for(let i=1;i<=100;i++){

    await setDoc(

        doc(db,"numbers",i.toString().padStart(2,"0")),

        {

            used:false

        }

    );

}

alert("Done!");
