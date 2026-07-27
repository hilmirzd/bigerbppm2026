const participantName = document.getElementById("participantName");
const numberDisplay = document.getElementById("numberDisplay");
const drawBtn = document.getElementById("drawBtn");

participantName.innerText =
    localStorage.getItem("participantName") || "Peserta";

let alreadyDraw = false;

drawBtn.addEventListener("click", () => {

    if(alreadyDraw) return;

    alreadyDraw = true;

    drawBtn.disabled = true;

    let counter = 0;

    const interval = setInterval(() => {

        numberDisplay.innerText =
            Math.floor(Math.random()*100)+1;

        counter++;

    },80);

    setTimeout(()=>{

        clearInterval(interval);

        const luckyNumber =
            Math.floor(Math.random()*100)+1;

        numberDisplay.innerText = luckyNumber;

        if(typeof confetti === "function"){

            confetti({
                particleCount:180,
                spread:120
            });

        }

        drawBtn.innerText = "SELESAI";

    },3000);

});
