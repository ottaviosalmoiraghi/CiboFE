import { chiamataBE } from './BFFE.js';
import { navElements } from './BFFE.js';

document.getElementById("btnIngredienti").addEventListener("click", () => {

    const numeroIngredienti = document.getElementById("numeroIngredientiInput").value;
    let inputIngredienti = document.getElementById("inputIngredienti");
    inputIngredienti.innerHTML = "";
    for (let i = 1; i <= numeroIngredienti; i++) {
        const label = document.createElement("label");
        label.for = `ingrediente${i}`;
        label.innerText = `Ingrediente ${i}`
        label.classList.add("form-label");
        const ingrediente = document.createElement("input");
        ingrediente.type = "text";
        ingrediente.id = `ingrediente${i}`;
        ingrediente.classList.add("form-control");
        ingrediente.placeholder = "Inserisci il nome dell'ingrediente";
        const quantita = document.createElement("input");
        quantita.type = "number";
        quantita.id = `quantita${i}`;
        quantita.classList.add("form-control");
        quantita.placeholder = "Inserisci la quantità dell'ingrediente";
        inputIngredienti.appendChild(label);
        inputIngredienti.appendChild(ingrediente);
        inputIngredienti.appendChild(quantita);
    }

    const bottoneRicetta = document.getElementById("btnInserimentoRicetta")
    const container = document.getElementById("containerInputIngredienti");
    if(numeroIngredienti == 0) {
        container.classList.remove("border");
        bottoneRicetta.classList.add("d-none");

    }
    else {
        container.classList.add("border");
        bottoneRicetta.classList.remove("d-none");
    }

})

document.getElementById("btnInserimentoRicetta").addEventListener("click", async () => {
    const nomeRicetta = document.getElementById("nomeRicettaInput");
    const portata = document.getElementById("inserimentoPortata").value;
    const portataEle = document.getElementById("inserimentoPortata");
    const inputIngredienti = document.getElementById("inputIngredienti");
    const numeroIngredienti = inputIngredienti.children.length / 3;
    const ingredienti = [];
    nomeRicetta.classList.remove("bg-danger-subtle");
    portataEle.classList.remove("bg-danger-subtle");
    for (let i = 1; i <= numeroIngredienti; i++) {
        ingredienti.push({
            ingrediente: document.getElementById(`ingrediente${i}`).value,
            quantita4: document.getElementById(`quantita${i}`).value,
        });
    }
    const ingredientiFinali = ingredienti.filter(ing => {
        if (ing.ingrediente != "") return true;
        else return false;
    })
    if (nomeRicetta.value == "") {
        nomeRicetta.classList.add("bg-danger-subtle");
        return;
    }
    if (portataEle.value == "") {
        portataEle.classList.add("bg-danger-subtle");
        return;
    }
    const contatore = ingredientiFinali.length;
    const numIngredienti = contatore;
    const dati = {
        nomeRicetta: nomeRicetta.value,
        numIngredienti: numIngredienti,
        portata: portata,
        ingredienti: ingredientiFinali,
    };

    const url = "/insert";
    const data = await chiamataBE(url, "POST", dati);
    console.log(data);
    alert("Ricetta inserita con successo!");

    for (let i = 1; i <= numeroIngredienti; i++) {
        document.getElementById(`ingrediente${i}`).value = "";
        document.getElementById(`quantita${i}`).value = "";
    }
    document.getElementById("nomeRicettaInput").value = "";
    document.getElementById("inserimentoPortata").value = "";
    document.getElementById("inputIngredienti").value = "";
});

document.getElementById("navInserisciRicette").addEventListener("click", () => {
    navElements("inserisciRicette");
});

document.getElementById("numeroIngredientiInput").addEventListener("input", () => {
    const numeroIngredienti = document.getElementById("numeroIngredientiInput");
    const bottoneIngredienti = document.getElementById("btnIngredienti");
    if (numeroIngredienti.value == "") bottoneIngredienti.classList.add("disabled");
    else bottoneIngredienti.classList.remove("disabled");
})