import { getRecipes } from "./requests.js";

export async function renderRecipes() {

    const recipes = await getRecipes();

    let div = document.getElementById("recipes-div");

    if (recipes.length == 0) {
        div.insertAdjacentHTML("beforeend", `<p id="no-nutri" class="alert alert-primary" role="alert">Sem receitas cadastradas.</p>`)
    } 

    recipes.forEach(element => {

        console.log(element);
        
        let src = element.picture ? "http://localhost:3000/files/" + element.picture : "../../../img/food-picture.jpg"
        console.log(src);
        
        div.insertAdjacentHTML("beforeend", `
            <div id="cards" class="row d-flex flex-wrap justify-content-center">
                <div class="card d-flex flex-column align-items-center" style="width: 18rem;">
                    <img src="${src}" class="card-img-top" alt="...">
                    <div class="card-body d-flex flex-column align-items-center">
                        <h5 class="card-title">${element.name}</h5>
                        <div id="action-buttons">
                        <form id="dataForm" action="../../receitas/preparar-receita/" method="GET">
                            <button type="submit" class="btn visualizar">PREPARAR</button>
                            <input type="hidden" name="recipeID" value="${element.recipeID}">
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        `)
    });


}

window.renderRecipes = renderRecipes
document.addEventListener("DOMContentLoaded", renderRecipes)


