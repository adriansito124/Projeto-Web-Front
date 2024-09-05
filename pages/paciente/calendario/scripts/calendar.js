import { getRecipes } from "../../../receitas/minhas-receitas/scripts/requests.js";
import { getDiet } from "../../minha-dieta/scripts/requests.js";
import { getPlannedRecipes } from "./requests.js";

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
                        </div>
                    </div>
                </div>
            `
        );
    // Add meals inside each day's accordion-body
    });

  // document.getElementById("recipes-div").setAttribute("class", "d-none");

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

  document.querySelectorAll(".accordion-body").forEach((accordion) => {
        accordion.insertAdjacentHTML(
            "beforeend",
            `
            <button type="button" onclick="insertPlanningModal()" class="btn visualizar mb-3 planejar-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                PLANEJE SEU DIA!
                </button>
            `
        );
    });

    if (!plannedRecipes.weekRecipes.length == 0) {

        Array.from(document.querySelectorAll(".planejar-btn")).forEach( btn => btn.setAttribute("class", "d-none"))
        
        plannedRecipes.weekRecipes.forEach((day) => {
            let weekDay = dayjs(day.day).$W == 0 ? 7 : dayjs(day.day).$W;
            let divValue = "recipes-div-" + weekDay;
            
            day.periods.forEach((period) => {
                document.getElementById(divValue).insertAdjacentHTML(
                    "beforeend",
                    `
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                            <h5 class="font-weight-bold card-title">${period.recipes[0].name}</h5>
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

window.renderCalendar = renderCalendar;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("date-input").valueAsDate = new Date();
  renderCalendar();
});

document
  .getElementById("date-input")
  .addEventListener("change", renderCalendar);
