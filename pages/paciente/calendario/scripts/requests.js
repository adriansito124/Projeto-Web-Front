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

export function insertPlanningModal() {
    document.getElementById("modal-from").setAttribute("data-value", target.parentelement.id)

}

export async function insertPlanning() {

    let manha = document.getElementById("manha").value
    let almoco = document.getElementById("almoco").value
    let tarde = document.getElementById("tarde").value
    let janta = document.getElementById("janta").value

    console.log(manha);
    console.log(almoco);
    console.log(tarde);
    console.log(janta);

    let date = dayjs(document.getElementById("date-input").value, 'DD/MM/YYYY')

    const startOfWeek = dayjs(date).startOf('isoWeek');

    // const response = await fetch(
    //     `${baseurl}/pacient/${JSON.parse(localStorage.getItem("userInfo")).Pacient.pacientID}/planejamento`,
    //     {
    //         method: "GET",
    //         headers: {
    //             "Authorization": localStorage.getItem("token"),
    //             "Content-Type": "application/json"
    //         }
    //     }
    // )    
    // return await response.json()
    
}


window.getPlannedRecipes = getPlannedRecipes;
window.insertPlanningModal = insertPlanningModal;