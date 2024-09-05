const baseurl = "http://localhost:3000"

dayjs.extend(dayjs_plugin_isoWeek);
dayjs.extend(dayjs_plugin_localeData);
dayjs.extend(dayjs_plugin_advancedFormat);

export async function getPlannedRecipes() {


    let date = dayjs(document.getElementById("date-input").value, 'DD/MM/YYYY')

    const startOfWeek = dayjs(date).startOf('isoWeek');

    const weekNumber = startOfWeek.isoWeek(); // Get the week number
    console.log(weekNumber);
    const endOfWeek = startOfWeek.endOf('isoWeek');
    
    const days = [];
    for (let date = startOfWeek; date.isBefore(endOfWeek); date = date.add(1, 'day')) {
      days.push(date.format('YYYY-MM-DD'));
    }

    console.log(days);
    

    console.log(date.year());

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


window.getPlannedRecipes = getPlannedRecipes;