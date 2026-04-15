import { chiamataBE } from './BFFE.js';
import { navElements } from './BFFE.js';

document.getElementById("btn").addEventListener("click", async () => {
    const port = document.getElementById("portataIndex");
    let url = "/read";
    const resultDiv = document.getElementById("tabellaRicette");
    const container = document.getElementById("containerTabella");

    // Se è selezionata una portata specifica
    if (port.value !== "TUTTE") {
        url = `/portata/${encodeURIComponent(port.value)}`;
    }

    const data = await chiamataBE(url, "GET", null);

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
});


document.getElementById("navVediRicette").addEventListener("click", () => {
    navElements("vediRicette");
});

