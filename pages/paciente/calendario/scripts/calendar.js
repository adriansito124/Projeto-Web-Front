import { getRecipes } from "../../../receitas/minhas-receitas/scripts/requests.js";
import { getDiet } from "../../minha-dieta/scripts/requests.js";
import { getList, getPlannedRecipes } from "./requests.js";

dayjs.extend(dayjs_plugin_isoWeek);
dayjs.extend(dayjs_plugin_localeData);
dayjs.extend(dayjs_plugin_advancedFormat);



export async function renderCalendar() {
    document.getElementById("selecione-alert").setAttribute("class", "d-none");

    const plannedRecipes = await getPlannedRecipes();
    console.log(plannedRecipes);

    const startOfWeek = dayjs(document.getElementById("date-input").value)
    .year(2024)
    .isoWeek(plannedRecipes.week)
    .startOf("isoWeek");
    const weekNumber = startOfWeek.isoWeek();

    const endOfWeek = startOfWeek.endOf("isoWeek");

    const days = [];
    for ( let date = startOfWeek; date.isBefore(endOfWeek); date = date.add(1, "day")) {
        days.push(date.format("DD/MM/YYYY"));
    }

    const accordionContainer = document.getElementById("accordionExample");

    accordionContainer.innerHTML = "";

    // Days of the week
    const daysOfWeek = [
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
        "Domingo",
    ];

  // Loop through each day and add accordion items
    daysOfWeek.forEach((day, index) => {
        const dayId = `collapse${index + 1}`;
        const headId = `heading${index + 1}`;

        const divClass =
            days[index] ===
            dayjs(document.getElementById("date-input").value).format("DD/MM/YYYY")
            ? "accordion-collapse collapse show"
            : "accordion-collapse collapse";

        accordionContainer.insertAdjacentHTML(
            "beforeend",
            `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="${headId}">
                        <button class="accordion-button collapsed" id="button${ index + 1}" type="button" data-bs-toggle="collapse" data-bs-target="#${dayId}" aria-expanded="false" aria-controls="${dayId}">
                            <div class="button-title d-flex justify-content-between w-100"><span>📆 ${day}</span><span>${days[index]}</span></div>
                        </button>
                    </h2>
                    <div id="${dayId}" class="${divClass}" aria-labelledby="${headId}"
                    data-bs-parent="#accordionExample">
                    <div id="accordion-body-${index}" class="accordion-body d-flex flex-column align-items-center">
                        <div id="recipes-div-${index + 1}" class="row recipes-div"></div>
                        <button type="button" id="planejar-btn-${index + 1}" data-value="${days[index]}" onclick="insertPlanningModal(event)" class="btn visualizar mb-3 planejar-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            PLANEJE SEU DIA!
                        </button>
                        <button type="button" id="editar-btn-${index + 1}" data-value="${days[index]}" onclick="updatePlanningModal(event)" class="btn visualizar mb-3 editar-btn d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            EDITE SEU PLANEJAMENTO
                        </button>
                        </div>
                    </div>
                </div>
            `
        );
    });

    if (plannedRecipes.weekRecipes) {

        plannedRecipes.weekRecipes.forEach((day) => {
            let weekDay = dayjs(day.day).$W == 0 ? 7 : dayjs(day.day).$W;
            let divValue = "recipes-div-" + weekDay;
            let btn = "planejar-btn-" + weekDay;
            let btnEditar = "editar-btn-" + weekDay;

            
            document.getElementById(btn).setAttribute("class", "d-none")
            document.getElementById(btnEditar).setAttribute("class", "btn visualizar mb-3 planejar-btn mt-3")
            
            day.periods.forEach((period) => {
                
                let emoji;

                switch (period.period) {
                    case "manha":

                        period.period = "Café da Manhã"
                        emoji = "🍳"
                        break;

                    case "almoco":
                        period.period = "Almoço"
                        emoji = "🥗"
                        break;

                    case "tarde":
                        period.period = "Café da Tarde"
                        emoji = "🥪"
                        break;

                    case "noite":
                        period.period = "Janta"
                        emoji = "🍝"
                        break;
                }

                document.getElementById(divValue).insertAdjacentHTML(
                    "beforeend",
                    `
                    <div class="col-sm-6 cardzinho-body">
                        <div class="card">
                            <div class="card-body">
                            <h5 class="font-weight-bold card-title">${emoji}  ${period.recipes[0].name}</h5>
                            <p class="card-text">${period.period}</p>
                            <form id="dataForm" action="../../receitas/preparar-receita/" method="GET">
                                <button type="submit" class="btn visualizar">PREPARAR</button>
                                <input type="hidden" name="recipeID" value="${period.recipes[0].recipeID}">
                            </form>
                            </div>
                        </div>
                    </div>
                    `
                );
            });
        });
    }
}

async function renderOptions() {
    let recipes = await getRecipes();
    recipes = recipes.map(({ RecipeSteps, RecipeIngredients, ...rest }) => ({
    ...rest,
    }));

    let dietRecipes = await getDiet();

    dietRecipes = dietRecipes.DietRecipes.map(({ dietID, period, ...rest }) => ({
        ...rest,
    }));

    dietRecipes = dietRecipes.reduce((acc, current) => {
        const x = acc.find((item) => item.recipeID === current.recipeID);
        return x ? acc : [...acc, current];
    }, []);

    const totalRecipes = [...recipes, ...dietRecipes];

    Array.from(document.querySelectorAll(".recipe-select")).forEach((select) => {
        totalRecipes.forEach((recipe) => {
            select.insertAdjacentHTML(
            "beforeend",
            `
                <option value="${recipe.recipeID}">${recipe.name}</option>
                    
            `
            );
        });
    });

}

async function renderList() {

    let list = await getList()

    console.log(list);
    console.log(list.result);

    let divList = document.getElementById("list")

    if(list.result == []) {
        divList.insertAdjacentHTML("beforeend", 
            `
            <p id="no-nutri" class="alert alert-primary" role="alert">Sem planejamento para essa semana!</p>

            `
        )
    }

    list.result.forEach( (item, index) => {
        divList.insertAdjacentHTML("beforeend", 
            `
            <div class="form group">
                <input type="checkbox" id="item-${index}">
                <label class="ml-3" for=""><h5>${item.quantity} ${item.measureSystem} ${item.name}</h5></label>
            </div>
            
            `
        )
    })

}

window.renderCalendar = renderCalendar;
window.renderList = renderList;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("date-input").valueAsDate = new Date();
    renderCalendar();
    renderOptions();
    renderList();
    document.getElementById("greetings").insertAdjacentHTML("beforeend", `
        <h3>O que vamos preparar hoje, <b>${JSON.parse(localStorage.getItem("userInfo")).name}<span>? 🥗</span></b></h3>    
    `)
});

document
    .getElementById("date-input")
    .addEventListener("change", renderCalendar);


