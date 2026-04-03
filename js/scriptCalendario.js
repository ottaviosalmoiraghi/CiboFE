document.getElementById("navCalendario").addEventListener("click", async () => {
    document.getElementById("vediCalendario").classList.remove("d-none");
    document.getElementById("vediRicette").classList.add("d-none");
    document.getElementById("containerTabella").classList.add("d-none");
    document.getElementById("inserisciRicette").classList.add("d-none");
    document.getElementById("portataIndex").value = "";
    document.getElementById("mealPrep").classList.add("d-none");

    const tabella = document.querySelectorAll(".calendario");
    tabella.forEach(t => {
        t.innerText="";
    });

    try{
        const response = await fetch("https://cibobe.onrender.com/api/readWeek");
        if(!response.ok){
            throw new Error("Errore nella chimata GTE"); 
        }
        const data = await response.json();
        data.forEach(d => {
            const elementId = d.pasto.toLowerCase() + d.giorno.toLowerCase();
            const elemento = document.getElementById(elementId);
            const h6 = document.createElement("h6");
            h6.innerText=d.nome;
            elemento.appendChild(h6);
        });
    }catch(error){
        console.error("Errore: ", error);
        alert("Errore durante la chiamata al DB");
    }
});