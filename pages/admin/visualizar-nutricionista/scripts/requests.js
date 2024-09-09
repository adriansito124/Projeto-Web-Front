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
            window.location.reload
            Toastify({
                text: "Nutricionista deletado com sucesso!",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)"
                  },
                duration: 2000
            }).showToast();
        }
    }


}

window.getNutri = getNutri;
window.deleteNutri = deleteNutri;