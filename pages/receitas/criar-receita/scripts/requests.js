import { ingredientes, passos } from "./receita.js"

const baseurl = "http://localhost:3000"

function teste() {
    console.log("teste uhul");
}

export async function postReceita(event) {

    event.preventDefault()
    console.log(ingredientes);
    console.log(passos);
    console.log("oioiooioi");

    const name = document.getElementById("nome_receita").value

    const response = await fetch(

        `${baseurl}/user/${JSON.parse(localStorage.getItem("userInfo")).userID}/criar-receita`,
        {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                ingredients: ingredientes,
                steps: passos
            })
        }
    )

    
    if (response.ok) {
        if (JSON.parse(localStorage.getItem("userInfo")).userType == 1) {

            window.location.href = "../minhas-receitas"
        } else {
            window.location.href = "../minhas-receitas"

        }
    }

}

document.addEventListener("DOMContentLoaded", () => {
    if (JSON.parse(localStorage.getItem("userInfo")).userType == 1) {
        document.getElementById("header").insertAdjacentHTML("beforeend", `
            <div class="separa">

            <h3 class="grande">Criar Receita</h3>

            <nav>
                <div id="action-buttons-1">
                    <ul>
                        <li><a href="../../nutricionista/meus-pacientes/"><img class="nav-icon"
                                    src="../../../img/icons/id-card-clip-alt.png" alt="visualizar-nutricionista"></a>
                        </li>
                    </ul>
                </div>
                <div id="action-buttons-2">
                    <ul>
                        <li><a href="../../receitas/minhas-receitas"><img class="nav-icon"
                                    src="../../../img/icons/recipe-book (1).png" alt="minhas-receitas"></a></li>
                    </ul>
                </div>
                <div id="action-buttons-3">
                    <ul>
                        <li><a href="../../login/"><img class="nav-icon" src="../../../img/icons/exit.png"
                                    alt="sair"></a></li>
                    </ul>
                </div>
            </nav>
        </div> 
        `)
    } else {
        document.getElementById("header").insertAdjacentHTML("beforeend", `
            <div class="separa">

            <h3 class="grande">Criar Receita</h3>

            <nav>
                <div id="action-buttons-1">
                    <ul>
                        <li><a href="../../paciente/minha-dieta/"><img class="nav-icon"
                                    src="../../../img/icons/id-card-clip-alt.png" alt="visualizar-nutricionista"></a>
                        </li>
                    </ul>
                </div>
                <div id="action-buttons-2">
                    <ul>
                        <li><a href="../../receitas/minhas-receitas"><img class="nav-icon"
                                    src="../../../img/icons/recipe-book (1).png" alt="minhas-receitas"></a></li>
                    </ul>
                </div>
                <div id="action-buttons-3">
                    <ul>
                        <li><a href="../../paciente/calendario"><img class="nav-icon" src="../../../img/icons/calendar-check.png" alt="calendario"></a></li>
                    </ul>
                </div>
                <div id="action-buttons-4">
                    <ul>
                        <li><a href="../../login/"><img class="nav-icon" src="../../../img/icons/exit.png"
                                    alt="sair"></a></li>
                    </ul>
                </div>
            </nav>
        </div>
    `)
    }
})


window.teste = teste
window.postReceita = postReceita