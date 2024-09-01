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

export async function deleteNutri(id) {

    if (confirm("Tem certeza que deseja deletar esse usuário?")) {

        const response = await fetch(
            `${baseurl}/admin/delete/${id}`,
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

window.getNutri = getNutri;
window.deleteNutri = deleteNutri;