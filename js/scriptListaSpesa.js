import { chiamataBE } from './BFFE.js';
import { navElements } from './BFFE.js';


function aggiungiElementoInput(input) {
    const valore = input.value.trim().toUpperCase();
    if (valore === "") return;
    const li = document.createElement("li");
    li.classList.add("list-group-item", "text-center");
    li.innerText = valore;
    const ul = input.closest("ul");
    ul.insertBefore(li, input.parentElement);
    input.value = "";
}

document.getElementById("navListaSpesa").addEventListener("click", async () => {

    navElements("vediListaSpesa");

    const url = "/readLista"
    const data = await chiamataBE(url, "GET", null);
    const ul = document.getElementById("ulListaSpesa");
    ul.innerHTML = "";
    data.forEach(ingr => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "text-center");
        li.innerText = (ingr.elementoLista);
        ul.appendChild(li);
    });
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.addEventListener("blur", () => {
        aggiungiElementoInput(input);
    })
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            aggiungiElementoInput(input);
            input.blur();
        }
    });
    li.classList.add("list-group-item", "text-center", "input");
    li.appendChild(input);
    ul.appendChild(li);
});

document.getElementById("ulListaSpesa").addEventListener("click", (event) => {
    const il = event.target.closest(".list-group-item");
    if (!il) return;
    il.classList.toggle("text-decoration-line-through");
})

document.getElementById("btnSalvaLista").addEventListener("click", async () => {
    const urlDelete = "/deleteLista";
    const url = "/salvaLista";
    const ul = document.getElementById("ulListaSpesa");
    const lista = Array.from(ul.children);
    const filtrata = lista.filter(li =>
        !li.classList.contains("input")
    );
    let request = [];
    filtrata.forEach(filtr => {
        request.push({
            elementoLista: filtr.innerText
        });
    });
    const dataDeleted = await chiamataBE(urlDelete, "POST", null);
    const data = await chiamataBE(url, "POST", request);
    if (data === undefined) {
        alert("Lista non inserita");
    } else {
        alert("Lista inserita correttamente!");
        // navElements("");
    }
})
