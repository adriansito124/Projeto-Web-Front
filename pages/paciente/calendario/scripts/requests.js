const baseurl = "http://localhost:3000"

// import dayjs from 'dayjs'; 
// import isoWeek from 'dayjs/plugin/isoWeek'; 
// import localeData from 'dayjs/plugin/localeData';

// dayjs.extend(isoWeek);
// dayjs.extend(localeData)

dayjs.extend(dayjs_plugin_isoWeek);
dayjs.extend(dayjs_plugin_localeData);
dayjs.extend(dayjs_plugin_advancedFormat);

export async function getPlannedRecipes() {


    let date = dayjs(document.getElementById("date-input").value, 'DD/MM/YYYY')

    const startOfWeek = dayjs(date).startOf('isoWeek');
    // const daysOfWeek = [];
    // const weekdayNames = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const weekNumber = startOfWeek.isoWeek(); // Get the week number
    console.log(weekNumber);

    // for (let i = 0; i < 7; i++) {
    //     const currentDay = startOfWeek.add(i, 'day');
    //     const formattedDate = currentDay.format(formatBrazilian);
    //     const weekdayName = weekdayNames[currentDay.day()]; // Get the name of the day
    //     daysOfWeek.push(`${weekdayName}, ${formattedDate}`);
    // }

    // return { daysOfWeek, weekNumber };
    
    // Get the start of the year
    // const startOfYear = dayjs(`${date.year()}-01-01`);

    // // Calculate the start of the week
    // const startOfWeek = startOfYear.isoWeek(req.params.week).startOf('isoWeek');

    // // Generate all days of the week
    // const weekDates = [];
    // for (let i = 0; i < 7; i++) {
    //     const date = startOfWeek.add(i, 'day');
    //     weekDates.push(date.format('DD/MM/YYYY')); // Format the date as needed
    // }

    // const startOfWeek = dayjs().year(year).isoWeek(weekNumber).startOf('isoWeek');
    // Calculate the end of the week (start of the next week)
    const endOfWeek = startOfWeek.endOf('isoWeek');
    
    // Generate array of days in the week
    const days = [];
    for (let date = startOfWeek; date.isBefore(endOfWeek); date = date.add(1, 'day')) {
      days.push(date.format('YYYY-MM-DD'));
    }

    console.log(days);
    

    console.log(date.year());

    const response = await fetch(
        `${baseurl}/pacient/${JSON.parse(localStorage.getItem("userInfo")).Pacient.pacientID}/ver-planejamento/27/${date.year()}`,
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