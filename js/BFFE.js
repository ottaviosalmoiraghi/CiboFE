
// http://localhost:8080/api
// https://cibobe.onrender.com/api

const loading = document.getElementById("loadingScreen");

async function chiamataBE(url, type, dati) {
    loading.classList.remove("d-none");
    const body = "https://cibobe.onrender.com/api";
    try {
        let response = null;
        if (type == "POST") {
            response = await fetch(body + url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(dati),
            });
        } else if (type == "GET") {
            response = await fetch(body + url);
        } else {
            alert("Non sono ammesse chiamate che non sono GET o POST");
            loading.classList.add("d-none");
            return;
        }
        if (!response.ok) {
            throw new Error("Errore nella chiamata " + type);
        }
        const data = await response.json();
        loading.classList.add("d-none");
        return data;
    } catch (error) {
        console.error("Errore: ", error);
        loading.classList.add("d-none");
        alert("Errore durante l'invio dei dati");
    }
}

function navElements(navElement) {
    document.getElementById("vediCalendario").classList.add("d-none");
    document.getElementById("vediRicette").classList.add("d-none");
    document.getElementById("containerTabella").classList.add("d-none");
    document.getElementById("inserisciRicette").classList.add("d-none");
    document.getElementById("portataIndex").value = "";
    document.getElementById("mealPrep").classList.add("d-none");
    document.getElementById("vediMakeLista").classList.add("d-none");
    document.getElementById("vediListaSpesa").classList.add("d-none");
    if (navElement !== "") document.getElementById(navElement).classList.remove("d-none");
}

export { navElements };
export { chiamataBE };
