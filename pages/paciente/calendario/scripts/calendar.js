dayjs.extend(dayjs_plugin_isoWeek);
dayjs.extend(dayjs_plugin_localeData);
dayjs.extend(dayjs_plugin_advancedFormat);

export async function renderCalendar() {

    const plannedRecipes = await getPlannedRecipes()
    console.log(plannedRecipes);

    const startOfWeek = dayjs().year(2024).isoWeek(plannedRecipes.week).startOf('isoWeek');
    const weekNumber = startOfWeek.isoWeek(); 
    console.log(weekNumber);

    const endOfWeek = startOfWeek.endOf('isoWeek');
    
    // Generate array of days in the week
    const days = [];
    for (let date = startOfWeek; date.isBefore(endOfWeek); date = date.add(1, 'day')) {
      days.push(date.format('DD/MM/YYYY'));
    }

    console.log(days);


    const accordionContainer = document.getElementById("accordionExample");

    accordionContainer.innerHTML = "";

    // Days of the week
    const daysOfWeek = [
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado',
        'Domingo'
    ];
    
    // Loop through each day and add accordion items
    daysOfWeek.forEach((day, index) => {
        const dayId = `collapse${index + 1}`;
        const headId = `heading${index + 1}`;
        
        accordionContainer.insertAdjacentHTML("beforeend", `
            <div class="accordion-item">
                <h2 class="accordion-header" id="${headId}">
                    <button class="accordion-button collapsed" id="button${index + 1}" type="button" data-bs-toggle="collapse"
                        data-bs-target="#${dayId}" aria-expanded="false" aria-controls="${dayId}">
                        <div class="button-title d-flex justify-content-between w-100"><span>📆${day}</span><span >${days[index]}</span></div>
                    </button>
                </h2>
                <div id="${dayId}" class="accordion-collapse collapse" aria-labelledby="${headId}"
                    data-bs-parent="#accordionExample">
                    <div id="accordion-body-${index}" class="accordion-body">
                        <!-- refeições body  -->
                    </div>
                </div>
            </div>
        `);

        // Add meals inside each day's accordion-body
    });

    if (plannedRecipes.weekRecipes == []) {
        document.querySelectorAll(".accordion-body").array.forEach( accordion => {
            accordion.insertAdjacentHTML("beforeend", 
                `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
                </button>`)
        })
    }

}

window.renderCalendar = renderCalendar
