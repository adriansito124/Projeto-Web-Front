function renderCalendar() {
    const accordionContainer = document.getElementById("accordionExample");
    
    // Clear the container first (optional, if you want to re-render)
    accordionContainer.innerHTML = "";

    // Days of the week
    const daysOfWeek = [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado'
    ];

    // Loop through each day and add accordion items
    daysOfWeek.forEach((day, index) => {
        const dayId = `collapse${index + 1}`;
        const headId = `heading${index + 1}`;

        // Create HTML for each day
        accordionContainer.insertAdjacentHTML("beforeend", `
            <div class="accordion-item">
                <h2 class="accordion-header" id="${headId}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#${dayId}" aria-expanded="false" aria-controls="${dayId}">
                        ${day}
                    </button>
                </h2>
                <div id="${dayId}" class="accordion-collapse collapse" aria-labelledby="${headId}"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <!-- refeições body  -->
                    </div>
                </div>
            </div>
        `);

        // Add meals inside each day's accordion-body
        const accordionBody = document.querySelector(`#${dayId} .accordion-body`);
        accordionBody.insertAdjacentHTML("beforeend", `
            <div class="card oi" style="width: 18rem;">
                <div class="card-body centrol">
                    <h5 class="card-title title">Café da Manhã 🍳</h5>
                    <h6 class="card-text">Nome da receita</h6>
                    <a href="#" class="btn btn-primary">Preparar</a>
                </div>
            </div>
            <div class="card oi" style="width: 18rem;">
                <div class="card-body centrol">
                    <h5 class="card-title title">Almoço 🥗</h5>
                    <h6 class="card-text">Nome da receita</h6>
                    <a href="#" class="btn btn-primary">Preparar</a>
                </div>
            </div>
            <div class="card oi" style="width: 18rem;">
                <div class="card-body centrol">
                    <h5 class="card-title title">Café da Tarde 🥪</h5>
                    <h6 class="card-text">Nome da receita</h6>
                    <a href="#" class="btn btn-primary">Preparar</a>
                </div>
            </div>
            <div class="card oi" style="width: 18rem;">
                <div class="card-body centrol">
                    <h5 class="card-title title">Jantar 🍝</h5>
                    <h6 class="card-text">Nome da receita</h6>
                    <a href="#" class="btn btn-primary">Preparar</a>
                </div>
            </div>
        `);
    });
}

document.addEventListener("DOMContentLoaded", renderCalendar);
