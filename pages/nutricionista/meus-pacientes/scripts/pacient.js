import { getPacients } from "./requests.js";

async function renderizarPacientes() {
    
    console.log("oioi");

    document.getElementById("greetings").insertAdjacentHTML("beforeend", `
        <h3>Bem-vindo(a) de volta, <b>${JSON.parse(localStorage.getItem("userInfo")).name}</b><img class="img-greetings" src="../../../img/maozinha.png" alt="sair"></h3>    
    `)

    let cards = document.getElementById("cards-div");

    const pacientes = await getPacients();
    console.log(pacientes);
    
    if (pacientes.length == 0) {
        cards.insertAdjacentHTML("beforeend", `<p id="no-nutri" class="alert alert-primary" role="alert">Sem pacientes cadastrados.</p>`)
    } else {
        Array.from(pacientes).forEach( paciente => {
            cards.insertAdjacentHTML("beforeend",
                `<div id="cards" class="row d-flex flex-wrap justify-content-center">
                    <div class="card d-flex flex-column align-items-center" style="width: 18rem;">
                        <img src="../../../img/Penguins.jpg" class="card-img-top" alt="...">
                        <div class="card-body d-flex flex-column align-items-center">
                            <h5 class="card-title">${paciente.name}</h5>
                            <div id="action-buttons">
                                <form id="dataForm" action="../visualizar-dieta/" method="GET">
                                    <button type="submit" class="btn visualizar">VISUALIZAR</button>
                                    <input type="hidden" name="pacientID" value="${paciente.Pacient.pacientID}">
                                </form>
                                <button onclick="deletePacient(${paciente.userID})" class="btn btn-danger">DELETAR</button>
                            </div>
                        </div>
                    </div>
                </div>`)
        })
    }
}

document.addEventListener("DOMContentLoaded", renderizarPacientes())
