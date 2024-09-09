import { getRecipe } from "./scripts/requests.js";

export async function renderRecipe(event) {
    event.preventDefault()
    console.log("oioi");
    const recipe = await getRecipe();

    console.log(recipe);

    let src = recipe.picture ? "http://localhost:3000/files/" + recipe.picture : "../../../img/food-picture.jpg"

    document.getElementById("picture").src = src
    document.getElementById("title").innerText = recipe.name

    let ing = document.getElementById("ing-id")

    recipe.RecipeIngredients.forEach( element => {
        ing.insertAdjacentHTML("beforeend", `
            <div class="d-flex flex-row gap-3">
                <h4>${element.name} </h4>
                <h4>${element.quantity} g</h4>
            </div>
        `)
    });

    let step = document.getElementById("step-id")

    recipe.RecipeSteps.forEach( element => {
        step.insertAdjacentHTML("beforeend", `
            <div class="d-flex flex-row gap-3">
                <h4>${element.stepNumber}. </h4>
                <h4>${element.description}</h4>
            </div>
        `)
    });

}


document.addEventListener("DOMContentLoaded", renderRecipe)

document.addEventListener("DOMContentLoaded", () => {
    let body = document.body

    if (localStorage.getItem("darkMode") == "true" ) {

        body.setAttribute("data-bs-theme", "dark") 
    } else {
        body.setAttribute("data-bs-theme", "light") 
    }
})


window.getRecipe = getRecipe