
// http://localhost:8080/api
// https://cibobe.onrender.com/api

async function chiamataBE(url, type, dati) {
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
            return;
        }
        if (!response.ok) {
            throw new Error("Errore nella chiamata " + type);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Errore: ", error);
        alert("Errore durante l'invio dei dati");
    }
}

export {chiamataBE};
