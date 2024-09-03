const baseurl = "http://localhost:3000"

export async function getRecipe() {

    const id = new URLSearchParams(window.location.search).get("recipeID");

    console.log(id);
    
    // fazendo a requisição completa, endpoint com headers e body
    const response = await fetch(
        `${baseurl}/user/${id}/visualizar-receita`,
        {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }
    )

    return await response.json()
}

document.addEventListener("DOMContentLoaded", () => {
    if (JSON.parse(localStorage.getItem("userInfo")).userType == 1) {
        document.getElementById("header").insertAdjacentHTML("beforeend", `
            <nav>
                <div id="action-buttons-1">
                    <ul>
                        <li><a href="../../nutricionista/meus-pacientes/"><img class="nav-icon" src="../../../img/icons/id-card-clip-alt.png" alt="meus-pacientes"></a></li>
                        <li><a href="../../receitas/minhas-receitas"><img class="nav-icon" src="../../../img/icons/recipe-book (1).png" alt="minhas-receitas"></a></li>
                    </ul>
                </div>  
                <div id="action-buttons-2">
                    <ul>
                        <li><a href="../../login/"><img class="nav-icon" src="../../../img/icons/exit.png" alt="sair"></a></li>
                    </ul>
                </div>
            </nav> 
        `)
    } else {
        document.getElementById("header").insertAdjacentHTML("beforeend", `
            <nav>
                <div id="action-buttons-1">
                    <ul>
                        <li><a href="#"><img class="nav-icon" src="../../../img/icons/medical-records.png" alt="dieta"></a></li>
                        <li><a href="../../receitas/minhas-receitas"><img class="nav-icon" src="../../../img/icons/recipe-book (1).png" alt="minhas-receitas"></a></li>
                        <li><a href="../../paciente/calendario"><img class="nav-icon" src="../../../img/icons/" alt="calendario"></a></li>
                    </ul>
                </div>  
                <div id="action-buttons-2">
                    <ul>
                        <li><a href="../../login/"><img class="nav-icon" src="../../../img/icons/exit.png" alt="sair"></a></li>
                    </ul>
                </div>
            </nav>
    `)
    }
})

window.getRecipe = getRecipe