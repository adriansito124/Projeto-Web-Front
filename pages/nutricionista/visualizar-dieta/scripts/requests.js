import { newRecipes } from "./dieta.js";

const baseurl = "http://localhost:3000"

export async function renderDiet() {

    const response = await fetch(
        `${baseurl}/pacient/${new URLSearchParams(window.location.search).get("pacientID")}/dieta`,
        {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }
    )   
    
    return await response.json();

};

export async function updateDiet() {

    const diet = await renderDiet();

    const calories = document.getElementById("calories").value
    const water = document.getElementById("water").value
    const protein = document.getElementById("protein").value
    const carbs = document.getElementById("carbs").value
    const fat = document.getElementById("fat").value

    const body = {
        calories: calories, 
        water: water, 
        protein: protein, 
        carbs: carbs, 
        fat: fat, 
        recipes: newRecipes
    }
    
    console.log(body);
    console.log(diet.dietID);
    

    const response = await fetch(
        `${baseurl}/nutri/updateDiet/${diet.dietID}`,
        {
            method: "PATCH",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            },

            body: JSON.stringify(body)
        }
    )    

    if (response.ok) {
        window.location.href = "../meus-pacientes/"
        
    } else {
        // toastify
    }
}

window.addEventListener("DOMContentLoaded", renderDiet());

window.renderDiet = renderDiet;
window.updateDiet = updateDiet;