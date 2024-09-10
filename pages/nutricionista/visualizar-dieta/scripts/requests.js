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

    const response = await fetch(
        `${baseurl}/nutri/updateDiet/${new URLSearchParams(window.location.search).get("pacientID")}`,
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
        Toastify({
            text: "Dieta alterada com sucesso!",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
              },
            duration: 2000
        }).showToast();
        
    } else {
        Toastify({
            text: "Erro ao alterar a dieta.",
            style: {
                background: "linear-gradient(to right, rgba(255,78,0,1), rgba(255,171,0,1)"
              },
            duration: 2000
        }).showToast();
    }
}

window.addEventListener("DOMContentLoaded", renderDiet());

window.renderDiet = renderDiet;
window.updateDiet = updateDiet;