const startBtn=document.getElementById("startBtn");

startBtn.onclick=()=>{

    const name=document.getElementById("name").value.trim();

    if(name===""){

        alert("Masukkan nama terlebih dahulu");

        return;

    }

    localStorage.setItem("participantName",name);

    location.href="lucky.html";

}
