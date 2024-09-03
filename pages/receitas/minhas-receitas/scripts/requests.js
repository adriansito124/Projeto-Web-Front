

const baseurl = "http://localhost:3000"

export async function getRecipes() {

    const response = await fetch(
        `${baseurl}/user/${JSON.parse(localStorage.getItem("userInfo")).userID}/receitas`,
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

window.getRecipes = getRecipes