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
                <div id="card" class="card d-flex flex-column align-items-center" style="width: 18rem;">
                    <img src="${src}" class="card-img-top" alt="...">
                    <div class="card-body d-flex flex-column align-items-center">
                        <h5 class="card-title">${element.name}</h5>
                        <div id="action-buttons">
                        <form id="dataForm" action="../../receitas/preparar-receita/" method="GET">
                            <button type="submit" class="btn visualizar2">PREPARAR</button>
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

document.addEventListener("DOMContentLoaded", () => {
    if (JSON.parse(localStorage.getItem("userInfo")).userType == 1) {
        document.getElementById("header").insertAdjacentHTML("beforeend", `
            <div class="separa">

            <h3 class="grande">Minhas Receitas</h3>

            <nav>
                <div id="action-buttons-1">
                    <ul>
                        <li><a href="../../nutricionista/meus-pacientes/"><img class="nav-icon"
                                    src="../../../img/icons/id-card-clip-alt.png" alt="visualizar-nutricionista"></a>
                        </li>
                    </ul>
                </div>
                <div id="action-buttons-2">
                    <ul>
                        <li><a href="../../receitas/minhas-receitas"><img class="nav-icon"
                                    src="../../../img/icons/recipe-book (1).png" alt="minhas-receitas"></a></li>
                    </ul>
                </div>
                <div id="action-buttons-3">
                    <ul>
                        <li><a href="../perfil/"><img class="nav-icon"
                                    src="../../../img/icons/perfil.png" alt="perfil"></a></li>
                    </ul>
                </div>
                <div id="action-buttons-4">
                    <ul>
                        <li><a href="../../login/"><img class="nav-icon" src="../../../img/icons/exit.png"
                                    alt="sair"></a></li>
                    </ul>
                </div>
            </nav>
        </div>
        `)
    } else {
        document.getElementById("header").insertAdjacentHTML("beforeend", `
            <div class="separa">

            <h3 class="grande">Minhas Receitas</h3>

            <nav>
                <div id="action-buttons-1">
                    <ul>
                        <li><a href="../../paciente/minha-dieta/"><img class="nav-icon"
                                    src="../../../img/icons/id-card-clip-alt.png" alt="visualizar-nutricionista"></a>
                        </li>
                    </ul>
                </div>
                <div id="action-buttons-2">
                    <ul>
                        <li><a href="../../receitas/minhas-receitas"><img class="nav-icon"
                                    src="../../../img/icons/recipe-book (1).png" alt="minhas-receitas"></a></li>
                    </ul>
                </div>
                <div id="action-buttons-3">
                    <ul>
                        <li><a href="../../paciente/calendario"><img class="nav-icon" src="../../../img/icons/calendar-check.png" alt="calendario"></a></li>
                    </ul>
                </div>
                <div id="action-buttons-4">
                    <ul>
                        <li><a href="../perfil/"><img class="nav-icon"
                                    src="../../../img/icons/perfil.png" alt="perfil"></a></li>
                    </ul>
                </div>
                <div id="action-buttons-5">
                    <ul>
                        <li><a href="../../login/"><img class="nav-icon" src="../../../img/icons/exit.png"
                                    alt="sair"></a></li>
                    </ul>
                </div>
                        </nav>
                    </div>
    `)
    }
})





