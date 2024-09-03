import { receitas } from "./dieta.js";

const baseurl = "http://localhost:3000"

export async function postDiet() {

    
    const pacientID = new URLSearchParams(window.location.search).get("pacientID");

    const calories = document.getElementById("calories").value
    const water = document.getElementById("water").value
    const protein = document.getElementById("protein").value
    const carbs = document.getElementById("carbs").value
    const fat = document.getElementById("fat").value

    const response = await fetch(
        `${baseurl}/nutri/${JSON.parse(localStorage.getItem("userInfo")).Nutricionist.nutricionistID}/criar-dieta/${pacientID}`,
        {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            
            body: JSON.stringify({
                calories: calories, 
                water: water, 
                protein: protein, 
                carbs: carbs, 
                fat: fat, 
                recipes: receitas
            })
        }
    )    

    const data = await response.json()

    if (response.ok) {
        window.location.href = "../meus-pacientes"
    }

}

window.postDiet = postDiet