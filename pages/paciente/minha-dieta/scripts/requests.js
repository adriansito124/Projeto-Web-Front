const baseurl = "http://localhost:3000"

export async function getDiet() {

    console.log("oioioi");
    
    console.log(JSON.parse(localStorage.getItem("userInfo")).Pacient.pacientID);

    // fazendo a requisição completa, endpoint com headers e body
    const response = await fetch(
        `${baseurl}/pacient/${JSON.parse(localStorage.getItem("userInfo")).Pacient.pacientID}/dieta`,
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

export function teste() {
    console.log("oioioi")
}

window.getDiet = getDiet