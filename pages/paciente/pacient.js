import data from "../../data/pacient.json" with { type: "json" }

function renderizarPacientes() {
    console.log("oioi");
    let cards = document.getElementById("cards");
    let dados = fetch("../../data.json")
    Array.from(data).forEach(paciente => {
        cards.insertAdjacentHTML("beforeend",
            `<div id="cards" class="row d-flex flex-wrap justify-content-center">
                <div class="card d-flex flex-column align-items-center" style="width: 18rem;">
                    <img src="#" class="card-img-top" alt="...">
                    <div class="card-body d-flex flex-column align-items-center">
                      <h5 class="card-title">${paciente.nome}</h5>
                      <a href="#" class="btn visualizar">VISUALIZAR</a>
                    </div>
                </div>
            </div>`
        )
    });
}



document.addEventListener("DOMContentLoaded", renderizarPacientes())



// Declaração da variável produtos fora do escopo do evento para torná-la global
// let pacientes;


// document.addEventListener("DOMContentLoaded", function () {
//   fetch("../../data.json")
//     .then((response) => response.json())
//     .then((data) => {
//       pacientes = data;
//       const produtosContainer = document.getElementById("container");

//       pacientes.forEach((paciente) => {
//         const cards = document.createElement("div");
//         cards.className = "cards";
//         cards.classList.add("row");
//         cards.classList.add("d-flex");
//         cards.classList.add("flex-wrap");
//         cards.classList.add("justify-content-center");

//         const card = document.createElement("div");
//         card.className = "card";
//         card.classList.add("card");
//         cards.classList.add("d-flex");
//         cards.classList.add("flex-column");
//         cards.classList.add("align-items-center");
//         card.style.width = "18rem";

//         const imagem = document.createElement("img");
//         imagem.src = paciente.imagem;
//         imagem.className = "card-img-top";
//         imagem.classList.add("card-img-top")

//         const cardBody = document.createElement("div");
//         cardBody.className = "card-body";
//         cardBody.classList.add("card-body");
//         cards.classList.add("d-flex");
//         cards.classList.add("flex-column");
//         cards.classList.add("align-items-center");

//         const cardTitle = document.createElement("h5");
//         cardTitle.className = "card-title";
//         cardTitle.textContent = paciente.nome;

//         const botao = document.createElement("a");
//         botao.href = "#"
//         botao.className = "btn";
//         botao.classList.add("btn");
//         cards.classList.add("visualizar");
//         botao.textContent = "VISUALIZAR";

//         cardBody.appendChild(cardTitle);
//         cardBody.appendChild(botao);

//         card.appendChild(imagem);
//         card.appendChild(cardBody);

//         cards.appendChild(card);

//         produtosContainer.appendChild(cards);
//       });
//     })
//     .catch((error) => console.error("Erro ao carregar o arquivo JSON", error));

// });