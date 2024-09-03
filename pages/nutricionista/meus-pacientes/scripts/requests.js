const baseurl = "http://localhost:3000"

export async function getPacients() {

    const response = await fetch(
        `${baseurl}/nutri/${JSON.parse(localStorage.getItem("userInfo")).Nutricionist.nutricionistID}/pacientes`,
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

export async function deletePacient(id) {

    if (confirm("Tem certeza que deseja deletar esse usuário?")) {

        const response = await fetch(
            `${baseurl}/nutri/delete/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": localStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            }
        )    
    
        if (response.ok) {
            // toastify
        }
    }
}

window.deletePacient = deletePacient