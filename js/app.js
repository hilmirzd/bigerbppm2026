const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {

    const name = document.getElementById("name").value.trim();

    if(name === ""){
        alert("Silakan masukkan nama.");
        return;
    }

    localStorage.setItem("participantName", name);

    window.location.href = "lucky.html";

});
