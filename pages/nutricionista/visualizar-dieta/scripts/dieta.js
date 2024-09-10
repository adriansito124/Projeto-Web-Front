import { getRecipes } from "../../../receitas/minhas-receitas/scripts/requests.js";
import { renderDiet } from "./requests.js";

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

        const diet = await renderDiet();
        console.log(diet);

        if (diet.message === "Diet not found") {
            document.getElementById("main").insertAdjacentHTML("afterbegin", `<p id="no-nutri" class="alert alert-primary p-1 mt-2 w-25 text-align-center" role="alert">Sem dieta cadastrada!</p>`);
        } else {
            renderDietRecipes(diet.DietRecipes);
            document.getElementById("calories").value = diet.totalCalories;
            document.getElementById("water").value = diet.waterIntake;
            document.getElementById("carbs").value = diet.carbs;
            document.getElementById("protein").value = diet.protein;
            document.getElementById("fat").value = diet.fat;
        }

        

    } catch (error) {
        console.error("Error fetching recipes or diet:", error);
    }
});

var morning = [];
var afternoon = [];
var lunch = [];
var evening = [];

function renderDietRecipes(receitas) {
    morning = [];
    afternoon = [];
    lunch = [];
    evening = [];

    receitas.forEach((receita) => {
        let div;
        let array;
        switch (receita.period) {
            case "manha":
                div = document.getElementById("recipe_manha");
                morning.push(receita);
                array = morning;
                break;
            case "almoco":
                div = document.getElementById("recipe_almoco");
                lunch.push(receita);
                array = lunch;
                break;
            case "tarde":
                div = document.getElementById("recipe_tarde");
                afternoon.push(receita);
                array = afternoon;
                break;
            case "noite":
                div = document.getElementById("recipe_noite");
                evening.push(receita);
                array = evening;
                break;
            default:
                console.warn(`Unknown period: ${receita.period}`);
                return;
        }

        if (div) {
            div.insertAdjacentHTML("beforeend",
                `<div class="maximo paz">
                    <div class="maximo2 redod reto">
                        <h6 class="alinhaa">${receita.name}</h6>
                    </div>
                     <button type="button" data-index="${array.length - 1}" data-period="${receita.period}" onclick="handleDelete(event)" class="excloi">X</button>
                </div>`
            );
        } else {
            console.error(`Div not found for period: ${receita.period}`);
        }
    });
}

export var newRecipes = [];

function updateReceitas() {
    newRecipes = [...morning, ...afternoon, ...lunch, ...evening];
    console.log("Updated receitas:");
    console.log(newRecipes);
}

function adicionarReceitaManha(event) {
    let select = document.getElementById("manha");
    let colunas = document.getElementById("recipe_manha");
    let valor = select.value;
    let valor1 = select.options[select.selectedIndex].text;

    if (!valor || !valor1) {
        console.error('No recipe selected.');
        return;
    }

    morning.push({ recipeID: valor, name: valor1, period: "manha" });
    select.value = "Selecione";

    renderReceitas(colunas, morning);
    updateReceitas();
}

function adicionarReceitaTarde(event) {
    let select = document.getElementById("tarde");
    let colunas = document.getElementById("recipe_tarde");
    let valor = select.value;
    let valor1 = select.options[select.selectedIndex].text;

    if (!valor || !valor1) {
        console.error('No recipe selected.');
        return;
    }

    afternoon.push({ recipeID: valor, name: valor1, period: "tarde" });
    select.value = "Selecione";

    renderReceitas(colunas, afternoon);
    updateReceitas();
}

function adicionarReceitaAlmoco(event) {
    let select = document.getElementById("almoco");
    let colunas = document.getElementById("recipe_almoco");
    let valor = select.value;
    let valor1 = select.options[select.selectedIndex].text;

    if (!valor || !valor1) {
        console.error('No recipe selected.');
        return;
    }

    lunch.push({ recipeID: valor, name: valor1, period: "almoco" });
    select.value = "Selecione";

    renderReceitas(colunas, lunch);
    updateReceitas();
}

function adicionarReceitaNoite(event) {
    let select = document.getElementById("noite");
    let colunas = document.getElementById("recipe_noite");
    let valor = select.value;
    let valor1 = select.options[select.selectedIndex].text;

    if (!valor || !valor1) {
        console.error('No recipe selected.');
        return;
    }

    evening.push({ recipeID: valor, name: valor1, period: "noite" });
    select.value = "Selecione";

    renderReceitas(colunas, evening);
    updateReceitas();
}

function handleDelete(event) {
    const button = event.target;
    console.log(button);
    
    const index = Number(button.getAttribute('data-index')); // Convert to number
    const period = button.getAttribute('data-period');

    if (index === null || period === null) {
        console.error('Missing index or period data attributes');
        return;
    }

    switch (period) {
        case "manha":
            morning.splice(index, 1);
            renderReceitas(document.getElementById("recipe_manha"), morning);
            break;
        case "almoco":
            lunch.splice(index, 1);
            renderReceitas(document.getElementById("recipe_almoco"), lunch);
            break;
        case "tarde":
            afternoon.splice(index, 1);
            renderReceitas(document.getElementById("recipe_tarde"), afternoon);
            break;
        case "noite":
            evening.splice(index, 1);
            renderReceitas(document.getElementById("recipe_noite"), evening);
            break;
        default:
            console.warn(`Unknown period: ${period}`);
            return;
    }

    updateReceitas();
}

function renderReceitas(colunas, array) {
    colunas.innerHTML = "";
    array.forEach((receita, index) => {
        colunas.insertAdjacentHTML("beforeend", `
            <div class="maximo paz">
                <div class="maximo2 redod reto">
                    <h6 class="alinhaa">${receita.name}</h6>
                </div>
                <button type="button" data-index="${array.length - 1}" data-period="${receita.period}" onclick="handleDelete(event)" class="excloi">X</button>
            </div>`
        );
    });
    colunas.scrollIntoView({ behavior: 'smooth' });
}

window.adicionarReceitaManha = adicionarReceitaManha;
window.adicionarReceitaTarde = adicionarReceitaTarde;
window.adicionarReceitaNoite = adicionarReceitaNoite;
window.adicionarReceitaAlmoco = adicionarReceitaAlmoco;
window.handleDelete = handleDelete;

