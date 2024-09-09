import { getRecipes } from "../../../receitas/minhas-receitas/scripts/requests.js";

document.addEventListener("DOMContentLoaded", async () => {
    let selects = Array.from(document.getElementsByClassName("receitas-nutri"));

    try {
        const recipes = await getRecipes();
        console.log(recipes);

        selects.forEach(select => {
            recipes.forEach(recipe => {
                select.insertAdjacentHTML("beforeend", `
                    <option period="${select.getAttribute("id")}" value="${recipe.recipeID}">${recipe.name}</option>
                `);
            });
        });

    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
});

export var receitas = [];
let morning = [];
let afternoon = [];
let lunch = [];
let evening = [];

function updateReceitas() {
    receitas = [...morning, ...afternoon, ...lunch, ...evening];
    console.log("Updated receitas:");
    console.log(receitas);
}

function adicionarReceitaManha(event) {
    event.preventDefault();
    let select = document.getElementById("manha");
    let colunas = document.getElementById("recipe_manha");
    let valor = select.value;
    let valor1 = select.options[select.selectedIndex].text;

    morning.push({ recipeID: valor, name: valor1, period: "manha" });
    document.getElementById("manha").value = "";

    renderReceitas(colunas, morning, deletarReceitaManha);
    updateReceitas();
    select.value = "Selecione";

}

function deletarReceitaManha(index) {
    morning.splice(index, 1);
    let colunas = document.getElementById("recipe_manha");
    renderReceitas(colunas, morning, deletarReceitaManha);
    updateReceitas();
    let select = document.getElementById("manha");
    select.value = "Selecione";


}

function adicionarReceitaTarde(event) {
    event.preventDefault();
    let select = document.getElementById("tarde");
    let colunas = document.getElementById("recipe_tarde");
    let valor = select.value;
    let valor1 = select.options[select.selectedIndex].text;

    afternoon.push({ recipeID: valor, name: valor1, period: "tarde" });
    document.getElementById("tarde").value = "";

    renderReceitas(colunas, afternoon, deletarReceitaTarde);
    updateReceitas();
    select.value = "Selecione";

}

function deletarReceitaTarde(index) {
    afternoon.splice(index, 1);
    let colunas = document.getElementById("recipe_tarde");
    renderReceitas(colunas, afternoon, deletarReceitaTarde);
    updateReceitas();
    let select = document.getElementById("tarde");
    select.value = "Selecione";


}

function adicionarReceitaAlmoco(event) {
    event.preventDefault();
    let select = document.getElementById("almoco");
    let colunas = document.getElementById("recipe_almoco");
    let valor = select.value;
    let valor1 = select.options[select.selectedIndex].text;

    lunch.push({ recipeID: valor, name: valor1, period: "almoco" });
    document.getElementById("almoco").value = "";

    renderReceitas(colunas, lunch, deletarReceitaAlmoco);
    updateReceitas();
    select.value = "Selecione";

}

function deletarReceitaAlmoco(index) {
    lunch.splice(index, 1);
    let colunas = document.getElementById("recipe_almoco");
    renderReceitas(colunas, lunch, deletarReceitaAlmoco);
    updateReceitas();
    let select = document.getElementById("almoco");
    select.value = "Selecione";
}

function adicionarReceitaNoite(event) {
    event.preventDefault();
    let select = document.getElementById("noite");
    let colunas = document.getElementById("recipe_noite");
    let valor = select.value;
    let valor1 = select.options[select.selectedIndex].text;

    evening.push({ recipeID: valor, name: valor1, period: "noite" });
    document.getElementById("noite").value = "";

    renderReceitas(colunas, evening, deletarReceitaJanta);
    updateReceitas();
    select.value = "Selecione";

}

function deletarReceitaJanta(index) {
    evening.splice(index, 1);
    let colunas = document.getElementById("recipe_noite");
    renderReceitas(colunas, evening, deletarReceitaJanta);
    updateReceitas();
    let select = document.getElementById("noite");
    select.value = "Selecione";

}

function renderReceitas(colunas, array, deleteFunction) {
    colunas.innerHTML = "";
    array.forEach((receita, index) => {
        colunas.insertAdjacentHTML("beforeend", `
            <div class="maximo paz">
                <div class="maximo2 redod reto">
                    <h6 class="alinhaa">${receita.name}</h6>
                </div>
                <button onclick="${deleteFunction.name}(${index})" class="excloi">X</button>
            </div>`
        );
    });
    colunas.scrollIntoView({ behavior: 'smooth' });
}

window.adicionarReceitaManha = adicionarReceitaManha;
window.adicionarReceitaTarde = adicionarReceitaTarde;
window.adicionarReceitaNoite = adicionarReceitaNoite;
window.adicionarReceitaAlmoco = adicionarReceitaAlmoco;
window.deletarReceitaManha = deletarReceitaManha;
window.deletarReceitaTarde = deletarReceitaTarde;
window.deletarReceitaAlmoco = deletarReceitaAlmoco;
window.deletarReceitaJanta = deletarReceitaJanta;


