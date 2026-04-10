import { chiamataBE } from './BFFE.js';

document.getElementById("navMealPrep").addEventListener("click", async () => {

    document.getElementById("containerTabella").classList.add("d-none");
    document.getElementById("inserisciRicette").classList.add("d-none");
    document.getElementById("portataIndex").value = "";
    document.getElementById("vediRicette").classList.add("d-none");
    document.getElementById("mealPrep").classList.remove("d-none");
    document.getElementById("vediCalendario").classList.add("d-none");

    const url = "/read"
    const data = await chiamataBE(url, "GET", null);
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
});

document.getElementById("btnConfermaMealPrep").addEventListener("click", async () => {
    const urlDelete = "/deleteMealPrep";
    const dataDelete = await chiamataBE(urlDelete, "POST", null);
    const mealPrepNode = document.querySelectorAll(".settimana");
    const mealPrep = Array.from(mealPrepNode);
    let request = [];
    const mealPrepFiltrata = mealPrep.filter(r => r.value != "");
    mealPrepFiltrata.forEach(p => {
        let pasto = p.id.substring(0, 4);
        switch (pasto) {
            case "pran":
                pasto = "PRANZO";
                break;
            case "cena":
                pasto = "CENA";
                break;
            default:
                pasto = "";
        }
        let giorno = p.id.substring(5);
        switch (giorno) {
            case "L":
                giorno = "LUNEDI";
                break;
            case "Ma":
                giorno = "MARTEDI";
                break;
            case "Me":
                giorno = "MERCOLEDI";
                break;
            case "G":
                giorno = "GIOVEDI";
                break;
            case "V":
                giorno = "VENERDI";
                break;
            case "S":
                giorno = "SABATO";
                break;
            case "D":
                giorno = "DOMENICA";
                break;
            default:
                giorno = "";
        }
        request.push({
            progRicetta: p.value,
            mealprep: [{
                pasto: pasto,
                giorno: giorno
            }]
        });
    });
    const urlUpdate = "/updateMealPrep";
    const dataUpdate = await chiamataBE(urlUpdate, "POST", request);
    if (dataUpdate === undefined) {
        alert("Meal Prep non inserito");
    } else {
        alert("Prep Meal inserito correttamente!");
    }
})