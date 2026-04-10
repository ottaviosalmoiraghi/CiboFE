import { chiamataBE } from './BFFE.js';

document.getElementById("navCalendario").addEventListener("click", async () => {
    document.getElementById("vediCalendario").classList.remove("d-none");
    document.getElementById("vediRicette").classList.add("d-none");
    document.getElementById("containerTabella").classList.add("d-none");
    document.getElementById("inserisciRicette").classList.add("d-none");
    document.getElementById("portataIndex").value = "";
    document.getElementById("mealPrep").classList.add("d-none");

    const tabella = document.querySelectorAll(".calendario");
    tabella.forEach(t => {
        t.innerText = "";
    });

    const url = "/readWeek";
    const data = await chiamataBE(url, "GET", null);
    data.forEach(d => {
        const meal = d.mealprep;
        meal.forEach(m => {
            const elementId = m.pasto.toLowerCase() + m.giorno.toLowerCase();
            const elemento = document.getElementById(elementId);
            const h6 = document.createElement("h6");
            h6.innerText = d.nome;
            elemento.appendChild(h6);
        });
    });
});