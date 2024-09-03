import { getRecipes } from "../../../receitas/minhas-receitas/scripts/requests.js";
import { renderDiet } from "./requests.js";

document.addEventListener("DOMContentLoaded", async () => {
    let selects = Array.from(document.getElementsByClassName("receitas-nutri"));

    
    const recipes = await getRecipes();
    console.log(recipes);

    selects.forEach(select => {
        recipes.forEach(recipe => {
            select.insertAdjacentHTML("beforeend", `
                <option period="${select.getAttribute("id")}" value="${recipe.recipeID}">${recipe.name}</option>
            `);
        });
    });

});

// Ensure `renderDiet` is awaited and `diet` is defined
const diet = await renderDiet();

console.log(diet);


export var receitas = diet.DietRecipes;
console.log(receitas);

document.getElementById("calories").value = diet.totalCalories;
document.getElementById("water").value = diet.waterIntake;
document.getElementById("carbs").value = diet.carbs;
document.getElementById("protein").value = diet.protein;
document.getElementById("fat").value = diet.fat;

renderDietRecipes();

function renderDietRecipes() {

    console.log(receitas);

    receitas.forEach((receita) => {
        let div;

        switch (receita.period) {
            case "manha":
                div = document.getElementById("recipe_manha");
                break;
            case "almoco":
                div = document.getElementById("recipe_almoco");
                break;
            case "tarde":
                div = document.getElementById("recipe_tarde");
                break;
            case "noite":
                div = document.getElementById("recipe_noite");
                break;
            default:
                console.warn(`Unknown period: ${receita.period}`);
                return;
        }

        if (div) {
            div.insertAdjacentHTML("beforeend",
                `<div class="maximo redod reto margem">
                    <h6 class="alinhaa">${receita.name}</h6>
                </div>`
            );
        } else {
            console.error(`Div not found for period: ${receita.period}`);
        }
    });
}

function adicionarReceita(periodo, selectId, recipeContainerId) {
    return function (event) {
        event.preventDefault();
        let select = document.getElementById(selectId);
        let periodoFromSelect = select.options[select.selectedIndex].getAttribute("period");
        let valor = select.value;
        let valor1 = select.options[select.selectedIndex].text;
        let colunas = document.getElementById(recipeContainerId);

        if (!colunas) {
            console.error(`Recipe container not found for ID: ${recipeContainerId}`);
            return;
        }

        colunas.innerHTML = "";

        receitas.push({ "period": periodoFromSelect, "recipeID": Number(valor), "name": valor1 });

        console.log(receitas);

        receitas.forEach((receita) => {
            if (receita.period === periodo) {
                colunas.insertAdjacentHTML("beforeend",
                    `<div class="maximo redod reto">
                        <h6 class="alinhaa">${receita.name}</h6>
                    </div>`
                );
            }
        });

        colunas.scrollIntoView({ behavior: 'smooth' });
        select.value = 'Selecione';
    };
}

window.adicionarReceitaManha = adicionarReceita("manha", "manha", "recipe_manha");
window.adicionarReceitaTarde = adicionarReceita("tarde", "tarde", "recipe_tarde");
window.adicionarReceitaAlmoco = adicionarReceita("almoco", "almoco", "recipe_almoco");
window.adicionarReceitaNoite = adicionarReceita("noite", "noite", "recipe_noite");