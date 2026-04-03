document.getElementById("navMealPrep").addEventListener("click", async () => {

    document.getElementById("containerTabella").classList.add("d-none");
    document.getElementById("inserisciRicette").classList.add("d-none");
    document.getElementById("portataIndex").value = "";
    document.getElementById("vediRicette").classList.add("d-none");
    document.getElementById("mealPrep").classList.remove("d-none");
    document.getElementById("vediCalendario").classList.add("d-none");

    try {
        const response = await fetch('https://cibobe.onrender.com/api/read');
        if (!response.ok) {
            throw new Error("Errore nella chiamata GET");
        }
        const data = await response.json();
        const select = document.querySelectorAll(".settimana");
        select.forEach(s => {
            s.innerHTML = "";
        });
        select.forEach(s => {
            const defaultOption = document.createElement("option");
            defaultOption.textContent = "Seleziona una ricetta";
            defaultOption.value = "";
            defaultOption.selected = true;
            defaultOption.disabled = true;

            s.appendChild(defaultOption);
        });
        data.forEach(ricetta => {
            select.forEach(s => {
                const option = document.createElement("option");
                option.textContent = ricetta.nome;
                option.value = ricetta.progRicetta;
                s.appendChild(option);
            });
        });

    } catch (error) {
        console.error("Errore: ", error);
        alert("Errore durante la lettura dei dati");
    }
});

document.getElementById("btnConfermaMealPrep").addEventListener("click", async ()=>{
    try{
        const responseDelete = await fetch("https://cibobe.onrender.com/api/deleteMealPrep", {
            method: "POST"
        });
        if(!responseDelete.ok){
            throw new Error("Errore nella chiamata POST della delete");
        }
        const mealPrepNode=document.querySelectorAll(".settimana");
        const mealPrep = Array.from(mealPrepNode);
        let request = [];
        const mealPrepFiltrata = mealPrep.filter(r => r.value != "");
        mealPrepFiltrata.forEach(p => {
            let pasto = p.id.substring(0,4);
            switch(pasto){
                case "pran":
                    pasto="PRANZO";
                    break;
                case "cena":
                    pasto="CENA";
                    break;
                default:
                    pasto="";
            }
            let giorno = p.id.substring(5);
            switch(giorno){
                case "L":
                    giorno="LUNEDI";
                    break;
                case "Ma":
                    giorno="MARTEDI";
                    break;
                case "Me":
                    giorno="MERCOLEDI";
                    break;
                case "G":
                    giorno="GIOVEDI";
                    break;
                case "V":
                    giorno="VENERDI";
                    break;
                case "S":
                    giorno="SABATO";
                    break;
                case "D":
                    giorno="DOMENICA";
                    break;
                default:
                    giorno="";
            }
            request.push({
                progRicetta: p.value,
                pasto: pasto,
                giorno: giorno
            });
        });
        const responseUpdate = await fetch("https://cibobe.onrender.com/api/updateMealPrep",{
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(request),
        });
        if(!responseUpdate.ok){
            throw new Error("Errore nella chiamata POST dell'update");
        }
        alert("Prep Meal inserito correttamente!");
    }catch(error){
        console.error("Errore: ", error);
        alert("Errore nell'inserimento del Meal Prep");
    }
})