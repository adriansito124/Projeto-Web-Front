const baseurl = "http://localhost:3000"

export async function getNutri() {

    // fazendo a requisição completa, endpoint com headers e body
    const response = await fetch(
        `${baseurl}/admin/nutris`,
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

window.getNutri = getNutri;