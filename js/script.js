let contatore=0;

function LeggiRicette(){
    fetch("http://192.168.1.50:8080/api/read")
        .then(response => {
                if (!response.ok) throw new Error("Errore nella chiamata GET");
                return response.json(); // trasformo JSON in oggetto JS
            })
        .then(data => {
            const resultDiv = document.getElementById("resultLettura");
            resultDiv.innerHTML = ""; // pulisco
            data.forEach(ricetta => {
                const p = document.createElement("div");
                p.textContent = ricetta.nome;
                p.style.color = "red";
                p.className = "boxbot";
                resultDiv.appendChild(p);
            });
        })
        .catch(error => {
            console.error("Errore:", error);
        });
}

function InserisciRicetta(){
    const nomeRicetta=document.getElementById("nome").value;
    const numIngredienti=contatore;
    const portata=document.getElementById("portata").value;
    const ingredienti=[];
    for(i=1;i<=contatore;i++){
        ingredienti.push({
            ingrediente: document.getElementById(`ingrediente${i}`).value,
            quantita4: document.getElementById(`quantita${i}`).value
        });
    }
    const dati = {
        nomeRicetta: nomeRicetta,
        numIngredienti: numIngredienti,
        portata: portata,
        ingredienti: ingredienti
    };

    fetch("http://192.168.1.50:8080/api/insert", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dati)
    })
    .then(response => {
            if (!response.ok) throw new Error("Errore nella chiamata GET");
            return response.json(); // trasformo JSON in oggetto JS
        })
    .then(data => {
        console.log(data);
        alert("Ricetta inserita con successo!");
    })
    .catch(error => {
        console.error("Errore:", error);
        alert("Errore durante l'invio dei dati");
    });
}

function AggiungiIngrediente(){
    contatore++;
    const contenitore = document.getElementById("contenitore-ingredienti");
    const div = document.createElement("div");
    div.className = "ingrediente";
    div.innerHTML=`<label for = "ingrediente${contatore}">Nome ingrediente ${contatore}: </label><input type="text" name="ingrediente${contatore}" id="ingrediente${contatore}" placeholder="Inserisci il nome dell ingrediente" maxlength="45"><br><label for = "quantita${contatore}">Quantità in grammi: </label><input type="number" name="quantita${contatore}" id="quantita${contatore}" placeholder="Inserisci la quantità"">`;
    contenitore.appendChild(div);
}