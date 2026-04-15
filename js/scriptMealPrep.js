import { chiamataBE } from './BFFE.js';
import { navElements } from './BFFE.js';

document.getElementById("navMealPrep").addEventListener("click", async () => {

    navElements("mealPrep");

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
        alert("Meal Prep inserito correttamente!");
        document.getElementById("mealPrep").classList.add("d-none");
        document.getElementById("vediMakeLista").classList.remove("d-none");
    }
    navElements("vediMakeLista");
    const url = "/getIngredienti";
    const data = await chiamataBE(url, "GET", null);
    const ul = document.getElementById("ulIngredienti");
    data.forEach(ingr => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        if (ingr.ingrediente === 'UOVA') ingr.ingrediente = ingr.quantita + " " + ingr.ingrediente;
        li.innerText = (ingr.ingrediente);
        ul.appendChild(li);
    });
})

document.getElementById("vediMakeLista").addEventListener("click", (event) => {
    const item = event.target.closest(".list-group-item");
    if (!item || item.classList.contains("text-bg-primary")) return;
    const parent = item.parentElement;
    if (parent.id === "ulIngredienti") {
        const lista = document.getElementById("ulPresenti");
        lista.appendChild(item);
    } else if (parent.id === "ulPresenti") {
        const lista = document.getElementById("ulIngredienti");
        lista.appendChild(item);
    }
});

document.getElementById("btnConfermaLista").addEventListener("click", async () => {
    const urlDelete = "/deleteLista";
    const url = "/salvaLista";
    const ul = document.getElementById("ulIngredienti");
    const lista = Array.from(ul.children);
    const filtrata = lista.filter(li =>
        !li.classList.contains("text-bg-primary")
    );
    let request = [];
    filtrata.forEach(filtr => {
        request.push({
            elementoLista: filtr.innerText
        });
    });
    const dataDeleted = await chiamataBE(urlDelete,"POST", null);
    const data = await chiamataBE(url,"POST", request);
    if (data === undefined) {
        alert("Lista non inserita");
    } else {
        alert("Lista inserita correttamente!");
        // navElements("");
    }
})