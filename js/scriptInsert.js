document.getElementById("btnIngredienti").addEventListener("click", () => {

    const numeroIngredienti = document.getElementById("numeroIngredientiInput").value;
    let inputIngredienti = document.getElementById("inputIngredienti");
    inputIngredienti.innerHTML = "";
    for (i = 1; i <= numeroIngredienti; i++) {
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

    document.getElementById("btnInserimentoRicetta").classList.remove("d-none");

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
    for (i = 1; i <= numeroIngredienti; i++) {
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

    try {
        const response = await fetch("https://cibobe.onrender.com/api/insert", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(dati),
        })
        if (!response.ok) {
            throw new Error("Errore nella chiamata POST");
        }
        const data = await response.json();
        console.log(data);
        alert("Ricetta inserita con successo!");
    } catch (error) {
        console.error("Errore:", error);
        alert("Errore durante l'invio dei dati");
    }

    for (i = 1; i <= 10; i++) {
        document.getElementById(`ingrediente${i}`).value = "";
        document.getElementById(`quantita${i}`).value = "";
    }
    document.getElementById("nomeRicettaInput").value = "";
    document.getElementById("inserimentoPortata").value = "";
    document.getElementById("inputIngredienti").value = "";
});

document.getElementById("navInserisciRicette").addEventListener("click", () => {
    document.getElementById("inserisciRicette").classList.remove("d-none");
    document.getElementById("vediRicette").classList.add("d-none");
    document.getElementById("mealPrep").classList.add("d-none");
});

document.getElementById("numeroIngredientiInput").addEventListener("input", () => {
    const numeroIngredienti = document.getElementById("numeroIngredientiInput");
    const bottoneIngredienti = document.getElementById("btnIngredienti");
    if (numeroIngredienti.value == "") bottoneIngredienti.classList.add("disabled");
    else bottoneIngredienti.classList.remove("disabled");
})