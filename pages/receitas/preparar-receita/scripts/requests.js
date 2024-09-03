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

window.getRecipe = getRecipe