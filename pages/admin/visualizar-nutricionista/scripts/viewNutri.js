
import { getNutri} from "./requests.js";

async function renderizarNutri() {
    

    let cards = document.getElementById("cards");

    const nutris = await getNutri();
    console.log(nutris);
    
    if (nutris.length == 0) {
        cards.insertAdjacentHTML("beforeend", `<p id="no-nutri" class="alert alert-primary" role="alert">Sem nutricionistas cadastrados.</p>`)
    } else {
        Array.from(nutris).forEach( nutri => {
            cards.insertAdjacentHTML("beforeend",
                `<div id="cards" class="row d-flex flex-wrap justify-content-center">
                    <div class="card d-flex flex-column align-items-center" style="width: 18rem;">
                        <img src="../../../img/Penguins.jpg" class="card-img-top" alt="...">
                        <div class="card-body d-flex flex-column align-items-center">
                            <h5 class="card-title">${nutri.name}</h5>
                            <h5 class="card-title">${nutri.Nutricionist.CRN}</h5>
                            <div id="action-buttons">
                                <form id="dataForm" action="../editar-nutricionista/" method="GET">
                                    <button type="submit" class="btn visualizar">EDITAR</button>
                                    <input type="hidden" name="nutriID" value="${nutri.userID}">
                                </form>
                                <button onclick="deleteNutri(${nutri.userID})" class="btn btn-danger">DELETAR</button>
                            </div>
                        </div>
                    </div>
                </div>`)
        })
    }
}

document.addEventListener("DOMContentLoaded", renderizarNutri())