document.getElementById("btn").addEventListener("click", async () => {
    const port = document.getElementById("portataIndex");
    let url = "https://cibobe.onrender.com/api/read";
    const resultDiv = document.getElementById("tabellaRicette");
    const container = document.getElementById("containerTabella");

    // Se è selezionata una portata specifica
    if (port.value !== "TUTTE") {
        url = `https://cibobe.onrender.com/api/portata/${encodeURIComponent(port.value)}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Errore nella chiamata GET");

        const data = await response.json();

        // Se non ci sono dati, nascondi subito il container e pulisci il div
        if (data.length === 0) {
            resultDiv.innerHTML = "";
            container.classList.add("d-none");
            return;
        }

        // Crea un fragment in memoria e aggiungi tutti i risultati
        let tempDiv = document.createDocumentFragment();

        let table = document.createElement("table");
        let tHead = document.createElement("thead");
        let trHead = document.createElement("tr");
        let th1Head = document.createElement("th");
        let th2Head = document.createElement("th");

        table.classList.add("table");
        table.classList.add("table-striped");
        table.classList.add("table-bordered");

        th1Head.textContent = "Nome Ricetta";
        th2Head.textContent = "Portata";
        trHead.appendChild(th1Head);
        trHead.appendChild(th2Head);
        tHead.appendChild(trHead)

        let tBody = document.createElement("tbody");

        data.forEach(ricetta => {
            let tr = document.createElement("tr");
            let tdNome = document.createElement("td");
            let tdPortata = document.createElement("td");
            tdNome.textContent = ricetta.nome;
            tdPortata.textContent = ricetta.portata;
            tr.appendChild(tdNome);
            tr.appendChild(tdPortata);
            tBody.appendChild(tr);
        });

        table.appendChild(tHead);
        table.appendChild(tBody);
        tempDiv.appendChild(table);

        // Aggiorna il DOM **in un colpo solo**
        resultDiv.innerHTML = "";
        resultDiv.appendChild(tempDiv);

        // Usa toggle in sicurezza: mostra solo se ci sono dati
        container.classList.remove("d-none");

    } catch (error) {
        console.error("Errore:", error);
        // nascondi il container se c'è un errore
        container.classList.add("d-none");
        resultDiv.innerHTML = "";
    }
});

document.getElementById("btnIngredienti").addEventListener("click", () => {
})

// document.getElementById("invio").addEventListener( "click", async ()=> {
//     const nomeRicetta = document.getElementById("nomeRicettaInput");
//     const portata = document.getElementById("inserimentoPortata").value;
//     const ingredienti = [];
//     nomeRicetta.classList.remove("error");
//     for (i = 1; i <= 10; i++) {
//         ingredienti.push({
//             ingrediente: document.getElementById(`ingrediente${i}`).value,
//             quantita4: document.getElementById(`quantita${i}`).value,
//         });
//     }
//     const ingredientiFinali = ingredienti.filter(ing => {
//         if(ing.ingrediente != "") return true;
//         else return false;
//     })
//     if(nomeRicetta.value == ""){
//         contenitoreInput.classList.add("error");
//         return;
//     }
//     const contatore = ingredientiFinali.length;
//     const numIngredienti = contatore;
//     const dati = {
//         nomeRicetta: nomeRicetta.value,
//         numIngredienti: numIngredienti,
//         portata: portata,
//         ingredienti: ingredientiFinali,
//     };

//     try {
//         const response = await fetch("https://cibobe.onrender.com/api/insert", {
//             method: "POST",
//             headers: {
//                 "Content-type": "application/json",
//             },
//             body: JSON.stringify(dati),
//         })
//         if (!response.ok) {
//             throw new Error("Errore nella chiamata POST");
//         }
//         const data = await response.json();
//         console.log(data);
//         alert("Ricetta inserita con successo!");
//     } catch (error) {
//         console.error("Errore:", error);
//         alert("Errore durante l'invio dei dati");
//     }

//     for (i = 1; i <= 10; i++) {
//         document.getElementById(`ingrediente${i}`).value = "";
//         document.getElementById(`quantita${i}`).value = "";
//     }
//     nomeRicetta.value="";
// });


document.getElementById("navVediRicette").addEventListener("click", () => {
    document.getElementById("vediRicette").classList.remove("d-none");
    document.getElementById("containerTabella").classList.add("d-none");
    document.getElementById("inserisciRicette").classList.add("d-none");
    document.getElementById("portataIndex").value = "";
});

document.getElementById("navInserisciRicette").addEventListener("click", () => {
    document.getElementById("inserisciRicette").classList.remove("d-none");
    document.getElementById("vediRicette").classList.add("d-none");
});

document.getElementById("numeroIngredientiInput").addEventListener("input", () => {
    const numeroIngredienti = document.getElementById("numeroIngredientiInput");
    const bottoneIngredienti = document.getElementById("btnIngredienti");
    if (numeroIngredienti.value == "") bottoneIngredienti.classList.add("disabled");
    else bottoneIngredienti.classList.remove("disabled");
})