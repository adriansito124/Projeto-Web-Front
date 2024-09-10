import { renderCalendar } from "./calendar.js";

const baseurl = "http://localhost:3000"

dayjs.extend(dayjs_plugin_isoWeek);
dayjs.extend(dayjs_plugin_localeData);
dayjs.extend(dayjs_plugin_advancedFormat);



export async function getPlannedRecipes() {


    let date = dayjs(document.getElementById("date-input").value, 'DD/MM/YYYY')

    const startOfWeek = dayjs(date).startOf('isoWeek');

    const weekNumber = startOfWeek.isoWeek(); 

    const response = await fetch(
        `${baseurl}/pacient/${JSON.parse(localStorage.getItem("userInfo")).Pacient.pacientID}/ver-planejamento/${weekNumber}/${date.year()}`,
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

export function insertPlanningModal(e) {
    document.getElementById("modal-form").setAttribute("data-value", e.target.getAttribute("data-value"))
    document.getElementById("modal-title").innerText = "Planeje seu dia!"
    document.getElementById("modal-btn").setAttribute("onclick", "insertPlanning()")

}

export function updatePlanningModal(e) {
    document.getElementById("modal-form").setAttribute("data-value", e.target.getAttribute("data-value"))
    document.getElementById("modal-title").innerText = "Edite seu planejamento"
    document.getElementById("modal-btn").setAttribute("onclick", "updatePlanning()")

}

export async function insertPlanning() {

    let manha = document.getElementById("manha").value
    let almoco = document.getElementById("almoco").value
    let tarde = document.getElementById("tarde").value
    let noite = document.getElementById("noite").value
    let date = document.getElementById("modal-form").getAttribute("data-value")

    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('/').map(Number);
        return dayjs(new Date(year, month - 1, day)); // JavaScript months are zero-based
      }
    
      // Create a Day.js object for the date
    const dateStr = date; // Date in DD/MM/YYYY format
    const parsedDate = parseDate(dateStr);

    const isoWeekNumber = parsedDate.isoWeek();

    console.log('ISO week number:', isoWeekNumber);

    let receitas = [ 
        {
            period: "manha", 
            recipeID: manha
        },
        {
            period: "almoco", 
            recipeID: almoco
        },
        {
            period: "tarde", 
            recipeID: tarde
        },
        {
            period: "noite", 
            recipeID: noite
        }
    ]



    let entries = [{date: date, recipes: receitas}]
    

    const response = await fetch(
        `${baseurl}/pacient/${JSON.parse(localStorage.getItem("userInfo")).Pacient.pacientID}/planejamento`,
        {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            
            body: JSON.stringify({
                week: isoWeekNumber,
                entries: entries
            })
        }
    )    
    
    const data = await response.json();
    console.log(data);
    

    if (response.status == 200) {
        
        renderCalendar()

        Toastify({
            text: "Planejamento criado com sucesso!",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
              },
            duration: 2000
        }).showToast();
        

    }
    
}

export async function updatePlanning() {

    let manha = document.getElementById("manha").value
    let almoco = document.getElementById("almoco").value
    let tarde = document.getElementById("tarde").value
    let noite = document.getElementById("noite").value
    let date = document.getElementById("modal-form").getAttribute("data-value")

    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('/').map(Number);
        return dayjs(new Date(year, month - 1, day)); // JavaScript months are zero-based
      }
    
      // Create a Day.js object for the date
    const dateStr = date; // Date in DD/MM/YYYY format
    const parsedDate = parseDate(dateStr);

    const isoWeekNumber = parsedDate.isoWeek();

    console.log('ISO week number:', isoWeekNumber);

    let receitas = [ 
        {
            period: "manha", 
            recipeID: manha
        },
        {
            period: "almoco", 
            recipeID: almoco
        },
        {
            period: "tarde", 
            recipeID: tarde
        },
        {
            period: "noite", 
            recipeID: noite
        }
    ]



    let entries = [{date: date, recipes: receitas}]
    

    const response = await fetch(
        `${baseurl}/pacient/${JSON.parse(localStorage.getItem("userInfo")).Pacient.pacientID}/editar-planejamento`,
        {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            
            body: JSON.stringify({
                week: isoWeekNumber,
                entries: entries
            })
        }
    )    
    
    const data = await response.json();
    console.log(data);
    

    if (response.status == 200) {
        
        renderCalendar()

        Toastify({
            text: "Planejamento alterado com sucesso!",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
              },
            duration: 2000
        }).showToast();
        

    }
    
}

export async function getList() {

    let date = dayjs(document.getElementById("date-input").value, 'DD/MM/YYYY')

    const startOfWeek = dayjs(date).startOf('isoWeek');

    const weekNumber = startOfWeek.isoWeek(); 

    const response = await fetch(
        `${baseurl}/pacient/${JSON.parse(localStorage.getItem("userInfo")).Pacient.pacientID}/lista-de-compras`,
        {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            
            body: JSON.stringify({
                week: weekNumber
            })
        }
    )  

    return await response.json()
}

window.getPlannedRecipes = getPlannedRecipes;
window.insertPlanningModal = insertPlanningModal;
window.updatePlanningModal = updatePlanningModal;
window.insertPlanning = insertPlanning;
window.updatePlanning = updatePlanning;