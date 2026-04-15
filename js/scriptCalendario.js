import { chiamataBE } from './BFFE.js';
import { navElements } from './BFFE.js';

document.getElementById("navCalendario").addEventListener("click", async () => {
    navElements("vediCalendario");
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