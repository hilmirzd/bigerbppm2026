const participantName =
document.getElementById("participantName");

const numberDisplay =
document.getElementById("numberDisplay");

const drawBtn =
document.getElementById("drawBtn");

participantName.textContent =
localStorage.getItem("participantName") || "-";

const luckyNumber =
localStorage.getItem("luckyNumber");

drawBtn.onclick = () => {

    drawBtn.disabled = true;

    let interval = setInterval(() => {

        numberDisplay.innerHTML =
        Math.floor(Math.random()*60+1)
        .toString()
        .padStart(2,"0");

    },60);

    setTimeout(()=>{

        clearInterval(interval);

        numberDisplay.innerHTML =
        luckyNumber.padStart(2,"0");

        confetti({

            particleCount:250,
            spread:180

        });

        drawBtn.innerHTML="SELESAI";

    },3000);

};
