
export async function renderProfile(res) {

    let src = res.profilePicture ? "http://localhost:3000/files/" + res.profilePicture : "../../../img/user.jpg"

    document.getElementById("name").innerText = res.name
    document.getElementById("email").innerText = res.email
    document.getElementById("profilePicture").src = src
    document.getElementById("name-input").value = res.name
    document.getElementById("email-input").value = res.email
}

document.addEventListener("DOMContentLoaded", () => {
    if (JSON.parse(localStorage.getItem("userInfo")).userType == 1) {
        document.getElementById("header").insertAdjacentHTML("beforeend", `
            <div class="separa">

            <h3 class="grande">Minhas Receitas</h3>

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
                        <li><a href="../perfil/"><img class="nav-icon"
                                    src="../../../img/icons/perfil.png" alt="perfil"></a></li>
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
    } else {
        document.getElementById("header").insertAdjacentHTML("beforeend", `
            <div class="separa">

            <h3 class="grande">Minhas Receitas</h3>

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
                        <li><a href="../perfil/"><img class="nav-icon"
                                    src="../../../img/icons/perfil.png" alt="perfil"></a></li>
                    </ul>
                </div>
                <div id="action-buttons-5">
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

window.renderProfile = renderProfile 







