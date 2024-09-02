import data from "../../data/recipe.json" with { type: "json" }

function renderizarPacientes() {
    console.log("oioi");
    let corpo = document.getElementById("corpo");

    Array.from(data).forEach(recipe => {



        let ingred =  recipe.ingrediente.map((ing, index) => `<h2>${recipe.quantidade[index]} - ${ing}</h2>`).join('');

        let passos = recipe.passos.map((step, index) => `<h2>${index+1}. ${step}</h2>`).join('');

        corpo.insertAdjacentHTML("beforeend",
            `<div class="max">
                <div class="ing">🥕 INGREDIENTES</div>
                <div class="ajustado">
                    <h2>${ingred}</h2>
                </div>
            </div>
            <div class="max">
                <div class="prep">🍲 MODO DE PREPARO</div>
                <div class="ajustado">
                    <h2>${passos}</h2>
                </div>
            </div>`
        )
    });
}


document.addEventListener("DOMContentLoaded", renderizarPacientes())