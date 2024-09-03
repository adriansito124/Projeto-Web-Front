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


function adicionarReceitaManha(event) {
    event.preventDefault();
    console.log("aiai");
    let select = document.getElementById("manha");
    let periodo = select.options[select.selectedIndex].getAttribute("period");
    let colunas = document.getElementById("recipe_manha");
    let valor = select.value
    let valor1 = select.options[select.selectedIndex].text


    colunas.innerHTML = "";

    receitas.push({ "period": periodo, "recipeID": valor, "name": valor1 })


    // ingredientes.push(valor);
    // quantidade.push(qtd);

    document.getElementById("manha").value = "";

    console.log(receitas);

    receitas.forEach((receita, index) => {

        if (receita.period == "manha") {
            colunas.insertAdjacentHTML("beforeend",
            `<div class="maximo redod reto margem">
                <h6 class="alinhaa">${receita.name}</h6>
            </div>`
        )
        }
        
    })

    colunas.scrollIntoView({ behavior: 'smooth' });

    select.value = 'Selecione'

}


function adicionarReceitaTarde(event) {
    event.preventDefault();
    console.log("aiai");
    let select = document.getElementById("tarde");
    let periodo = select.options[select.selectedIndex].getAttribute("period");
    let colunas = document.getElementById("recipe_tarde");
    let valor = select.value
    let valor1 = select.options[select.selectedIndex].text

    colunas.innerHTML = "";

    receitas.push({ "period": periodo, "recipeID": valor, "name": valor1 })


    // ingredientes.push(valor);
    // quantidade.push(qtd);

    document.getElementById("tarde").value = "";

    console.log(receitas);

    receitas.forEach((receita, index) => {
        
        if (receita.period == "tarde") {
           colunas.insertAdjacentHTML("beforeend",
            `<div class="maximo redod reto">
                <h6 class="alinhaa">${receita.name}</h6>
            </div>`
        ) 
        }
        
    })

    colunas.scrollIntoView({ behavior: 'smooth' });

    select.value = 'Selecione'

}

function adicionarReceitaAlmoco(event) {
    event.preventDefault();
    console.log("aiai");
    let select = document.getElementById("almoco");
    let periodo = select.options[select.selectedIndex].getAttribute("period");
    let colunas = document.getElementById("recipe_almoco");
    let valor = select.value
    let valor1 = select.options[select.selectedIndex].text

    colunas.innerHTML = "";

    receitas.push({ "period": periodo, "recipeID": valor, "name": valor1 })



    // ingredientes.push(valor);
    // quantidade.push(qtd);

    document.getElementById("almoco").value = "";

    console.log(receitas);

    receitas.forEach((receita, index) => {

        if (receita.period == "almoco") {
           colunas.insertAdjacentHTML("beforeend",
            `<div class="maximo redod reto">
                <h6 class="alinhaa">${receita.name}</h6>
            </div>`
        ) 
        }

    })

    colunas.scrollIntoView({ behavior: 'smooth' });

    select.value = 'Selecione'

}

function adicionarReceitaNoite(event) {
    event.preventDefault();
    console.log("aiai");
    let select = document.getElementById("noite");
    let periodo = select.options[select.selectedIndex].getAttribute("period");
    let colunas = document.getElementById("recipe_noite");
    let valor = select.value
    let valor1 = select.options[select.selectedIndex].text

    colunas.innerHTML = "";

    receitas.push({ "period": periodo, "recipeID": valor, "name": valor1 })


    // ingredientes.push(valor);
    // quantidade.push(qtd);

    document.getElementById("noite").value = "";

    console.log(receitas);

    receitas.forEach((receita, index) => {

        if (receita.period == "noite") {
            colunas.insertAdjacentHTML("beforeend",
            `<div class="maximo redod reto">
                <h6 class="alinhaa">${receita.name}</h6>
            </div>`
            )
        }
    })

    colunas.scrollIntoView({ behavior: 'smooth' });

    select.value = 'Selecione'
}



window.adicionarReceitaManha = adicionarReceitaManha;
window.adicionarReceitaTarde = adicionarReceitaTarde;
window.adicionarReceitaNoite = adicionarReceitaNoite;
window.adicionarReceitaAlmoco = adicionarReceitaAlmoco;