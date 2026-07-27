const participantName =
document.getElementById("participantName");

const numberDisplay =
document.getElementById("numberDisplay");

const drawBtn =
document.getElementById("drawBtn");

participantName.textContent =
localStorage.getItem("participantName") || "Peserta";

let alreadyDraw = false;

drawBtn.onclick = () => {

    if(alreadyDraw) return;

    alreadyDraw = true;

    drawBtn.disabled = true;

    numberDisplay.classList.add("active");

    let interval = setInterval(()=>{

        let random = Math.floor(Math.random()*100)+1;

        numberDisplay.innerHTML =
        random.toString().padStart(2,"0");

    },60);

    setTimeout(()=>{

        clearInterval(interval);

        let lucky =
        Math.floor(Math.random()*100)+1;

        numberDisplay.innerHTML =
        lucky.toString().padStart(2,"0");

        confetti({

            particleCount:250,

            spread:150,

            origin:{y:.6}

        });

        drawBtn.innerHTML="SELESAI";

    },3000);

};
