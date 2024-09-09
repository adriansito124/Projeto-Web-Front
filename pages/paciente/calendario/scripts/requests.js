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

}

// export function updatePlanningModal(e) {
//     document.getElementById("modal-form").setAttribute("data-value", e.target.getAttribute("data-value"))
//     console.log(document.getElementById("modal-form").getAttribute("data-value"));
//     console.log(document.getElementById("manha"));
//     document.getElementById("manha").value = "bolinho";

//     // document.getElementById("manha").value = "abobrinha"
//     document.getElementById("almoco").value
//     document.getElementById("tarde").value
//     document.getElementById("noite").value

// }

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
        var modal = document.getElementById('exampleModal');

        // Manually hide the modal
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Remove the modal-open class if present
      
        // Remove the backdrop (if present)
        var backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }

        window.location.reload
        
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


window.getPlannedRecipes = getPlannedRecipes;
window.insertPlanningModal = insertPlanningModal;
window.insertPlanning = insertPlanning;