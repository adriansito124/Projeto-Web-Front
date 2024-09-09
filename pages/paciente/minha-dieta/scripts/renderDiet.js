import { getDiet, teste } from "./requests.js";

async function renderDiet() {

    const diet = await getDiet();

    console.log(diet);

    document.getElementById("greetings").insertAdjacentHTML("beforeend", `
        <h3>Bem-vindo(a) de volta, <b>${JSON.parse(localStorage.getItem("userInfo")).name}</b><img class="img-greetings" src="../../../img/maozinha.png" alt="sair"></h3>    
    `)

    const firstAccordion = document.getElementById("1-accordion")
    const secondAccordion = document.getElementById("2-accordion")
    const thirdAccordion = document.getElementById("3-accordion")
    const fourthAccordion = document.getElementById("4-accordion")

    
    var accordionBody;

    diet.DietRecipes.forEach( element => {
        switch (element.period) {
            case "manha":
                accordionBody = firstAccordion
                break;

            case "almoco":
                accordionBody = secondAccordion;
                break;

            case "tarde":
                accordionBody = thirdAccordion;
                break;

            case "noite":
                accordionBody = fourthAccordion;
            break;
        
            default:
                break;
        }

        let src = element.picture ? "http://localhost:3000/files/" + element.picture : "../../../img/food-picture.jpg"
        console.log(src);

        accordionBody.insertAdjacentHTML("beforeend", `
            <div id="cards" class="row d-flex flex-wrap justify-content-center">
                <div class="card d-flex flex-column align-items-center" style="width: 18rem;">
                    <img src="${src}" class="card-img-top" alt="...">
                    <div class="card-body d-flex flex-column align-items-center">
                        <h5 class="card-title">${element.name}</h5>
                        <div id="action-buttons">
                        <form id="dataForm" action="../../receitas/preparar-receita/" method="GET">
                            <button type="submit" class="btn visualizar">TESTE</button>
                            <input type="hidden" name="recipeID" value="${element.recipeID}">
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        `)

    });
    
}

document.addEventListener("DOMContentLoaded", renderDiet)