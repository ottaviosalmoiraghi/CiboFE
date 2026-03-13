let contatore = 0;

document.getElementById("btn1").addEventListener("click", async () => {
    const port = document.getElementById("portata-index");
    let url = "https://cibobe.onrender.com/api/read";
    const resultDiv = document.getElementById("resultLettura");
    const container = document.getElementById("container-lista");

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
            container.classList.remove("visible");
            return;
        }

        // Crea un fragment in memoria e aggiungi tutti i risultati
        const tempDiv = document.createDocumentFragment();
        data.forEach(ricetta => {
            const p = document.createElement("div");
            p.textContent = ricetta.nome;
            p.style.color = "red";
            p.className = "boxbot";
            tempDiv.appendChild(p);
        });

        // Aggiorna il DOM **in un colpo solo**
        resultDiv.innerHTML = "";
        resultDiv.appendChild(tempDiv);

        // Usa toggle in sicurezza: mostra solo se ci sono dati
        container.classList.toggle("visible", data.length > 0);

    } catch (error) {
        console.error("Errore:", error);
        // nascondi il container se c'è un errore
        container.classList.remove("visible");
        resultDiv.innerHTML = "";
    }
});

async function InserisciRicetta() {
    const nomeRicetta = document.getElementById("nome").value;
    const portata = document.getElementById("portata").value;
    const ingredienti = [];
    for (i = 1; i <= contatore; i++) {
        ingredienti.push({
            ingrediente: document.getElementById(`ingrediente${i}`).value,
            quantita4: document.getElementById(`quantita${i}`).value,
        });
    }
    const ingredientiFinali = ingredienti.filter(ing => {
        if(ing.ingrediente != "") return true;
        else {
            contatore--
            return false
        };
    })
    const numIngredienti = contatore;
    const dati = {
        nomeRicetta: nomeRicetta,
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
}

function AggiungiIngrediente() {
    contatore++;
    const contenitore = document.getElementById("contenitore-ingredienti");
    const div = document.createElement("div");
    div.className = "ingrediente";
    div.innerHTML = `<label for = "ingrediente${contatore}">Nome ingrediente ${contatore}: </label><input type="text" name="ingrediente${contatore}" id="ingrediente${contatore}" placeholder="Inserisci il nome dell ingrediente" maxlength="45"><br><label for = "quantita${contatore}">Quantità in grammi: </label><input type="number" name="quantita${contatore}" id="quantita${contatore}" placeholder="Inserisci la quantità"">`;
    contenitore.appendChild(div);
}
