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
export var morning = [];
export var afternoon = [];
export var lunch = [];
export var evening = [];


function adicionarReceitaManha(event) {
    event.preventDefault();
    console.log("aiai");
    let select = document.getElementById("manha");
    let colunas = document.getElementById("recipe_manha");
    let valor = select.value
    let valor1 = select.options[select.selectedIndex].text


    colunas.innerHTML = "";

    morning.push({ "recipeID": valor, "name": valor1 })


    // ingredientes.push(valor);
    // quantidade.push(qtd);

    document.getElementById("manha").value = "";

    console.log(morning);

    morning.forEach((receita, index) => {


        colunas.insertAdjacentHTML("beforeend",
            `<div class="maximo paz">
                <div class="maximo2 redod reto">
                    <h6 class="alinhaa">${receita.name}</h6>
                </div>
                <button id="${index}" onclick="deletarReceitaManha(${index})" class="excloi">X</button>
            </div>`
        )


    })

    colunas.scrollIntoView({ behavior: 'smooth' });

    select.value = 'Selecione'

}



function deletarReceitaManha(index) {
    morning.splice(index, 1);

    let colunas = document.getElementById("recipe_manha");
    colunas.innerHTML = "";

    console.log(receitas);

    morning.forEach((receita, i) => {

        colunas.insertAdjacentHTML("beforeend",
            `<div class="maximo paz">
                <div class="maximo2 redod reto">
                    <h6 class="alinhaa">${receita.name}</h6>
                </div>
                <button onclick="deletarReceitaManha(${i})" class="excloi">X</button>
            </div>`
        )
    })

}



function adicionarReceitaTarde(event) {
    event.preventDefault();
    console.log("aiai");
    let select = document.getElementById("tarde");
    let colunas = document.getElementById("recipe_tarde");
    let valor = select.value
    let valor1 = select.options[select.selectedIndex].text

    colunas.innerHTML = "";

    afternoon.push({ "recipeID": valor, "name": valor1 })


    // ingredientes.push(valor);
    // quantidade.push(qtd);

    document.getElementById("tarde").value = "";

    console.log(afternoon);

    afternoon.forEach((receita, index) => {


        colunas.insertAdjacentHTML("beforeend",
            `<div class="maximo paz">
                <div class="maximo2 redod reto">
                    <h6 class="alinhaa">${receita.name}</h6>
                </div>
                <button id="${index}" onclick="deletarReceitaTarde(${index})" class="excloi">X</button>
            </div>`
        )
    }

    )

    colunas.scrollIntoView({ behavior: 'smooth' });

    select.value = 'Selecione'

}



function deletarReceitaTarde(index) {
    afternoon.splice(index, 1);

    let colunas = document.getElementById("recipe_tarde");
    colunas.innerHTML = "";

    console.log(afternoon);

    afternoon.forEach((receita, i) => {

        colunas.insertAdjacentHTML("beforeend",
            `<div class="maximo paz">
                <div class="maximo2 redod reto">
                    <h6 class="alinhaa">${receita.name}</h6>
                </div>
                <button onclick="deletarReceitaTarde(${i})" class="excloi">X</button>
            </div>`
        )
    })

}




function adicionarReceitaAlmoco(event) {
    event.preventDefault();
    console.log("aiai");
    let select = document.getElementById("almoco");
    let colunas = document.getElementById("recipe_almoco");
    let valor = select.value
    let valor1 = select.options[select.selectedIndex].text

    colunas.innerHTML = "";

    lunch.push({ "recipeID": valor, "name": valor1 })



    // ingredientes.push(valor);
    // quantidade.push(qtd);

    document.getElementById("almoco").value = "";

    console.log(lunch);

    lunch.forEach((receita, index) => {


        colunas.insertAdjacentHTML("beforeend",
            `<div class="maximo paz">
                <div class="maximo2 redod reto">
                    <h6 class="alinhaa">${receita.name}</h6>
                </div>
                <button id="${index}" onclick="deletarReceitaAlmoco(${index})" class="excloi">X</button>
            </div>`
        )
    }

    )

    colunas.scrollIntoView({ behavior: 'smooth' });

    select.value = 'Selecione'

}



function deletarReceitaAlmoco(index) {
    lunch.splice(index, 1);

    let colunas = document.getElementById("recipe_almoco");
    colunas.innerHTML = "";

    console.log(lunch);

    lunch.forEach((receita, i) => {

        colunas.insertAdjacentHTML("beforeend",
            `<div class="maximo paz">
                <div class="maximo2 redod reto">
                    <h6 class="alinhaa">${receita.name}</h6>
                </div>
                <button onclick="deletarReceitaAlmoco(${i})" class="excloi">X</button>
            </div>`
        )
    })

}




function adicionarReceitaNoite(event) {
    event.preventDefault();
    console.log("aiai");
    let select = document.getElementById("noite");
    let colunas = document.getElementById("recipe_noite");
    let valor = select.value
    let valor1 = select.options[select.selectedIndex].text

    colunas.innerHTML = "";

    evening.push({ "recipeID": valor, "name": valor1 })


    // ingredientes.push(valor);
    // quantidade.push(qtd);

    document.getElementById("noite").value = "";

    console.log(evening);

    evening.forEach((receita, index) => {


        colunas.insertAdjacentHTML("beforeend",
            `<div class="maximo paz">
                <div class="maximo2 redod reto">
                    <h6 class="alinhaa">${receita.name}</h6>
                </div>
                <button id="${index}" onclick="deletarReceitaJanta(${index})" class="excloi">X</button>
            </div>`
        )
    }
    )

    colunas.scrollIntoView({ behavior: 'smooth' });

    select.value = 'Selecione'
}



function deletarReceitaJanta(index) {
    evening.splice(index, 1);

    let colunas = document.getElementById("recipe_noite");
    colunas.innerHTML = "";

    console.log(evening);

    evening.forEach((receita, i) => {

        colunas.insertAdjacentHTML("beforeend",
            `<div class="maximo paz">
                <div class="maximo2 redod reto">
                    <h6 class="alinhaa">${receita.name}</h6>
                </div>
                <button onclick="deletarReceitaJanta(${i})" class="excloi">X</button>
            </div>`
        )
    })

}



window.adicionarReceitaManha = adicionarReceitaManha;
window.adicionarReceitaTarde = adicionarReceitaTarde;
window.adicionarReceitaNoite = adicionarReceitaNoite;
window.adicionarReceitaAlmoco = adicionarReceitaAlmoco;
window.deletarReceitaManha = deletarReceitaManha;
window.deletarReceitaTarde = deletarReceitaTarde;
window.deletarReceitaAlmoco = deletarReceitaAlmoco;
window.deletarReceitaJanta = deletarReceitaJanta;