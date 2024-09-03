const baseurl = "http://localhost:3000"

export async function renderDiet() {

    const response = await fetch(
        `${baseurl}/pacient/${new URLSearchParams(window.location.search).get("pacientID")}/dieta`,
        {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }
    )   
    
    return await response.json();

};

export async function updateNutri() {

    const name = document.getElementById("name").value
    const CRN = document.getElementById("CRN").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    console.log(password)

    const id = new URLSearchParams(window.location.search).get("nutriID");

    const body = {
        name,
        CRN, 
        email
    } 
    
    if (password.length > 0) {
        body.password = password
    }

    const response = await fetch(
        `${baseurl}/admin/editar/${id}`,
        {
            method: "PATCH",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            },

            body: JSON.stringify(body)
        }
    )    

    if (response.ok) {
        window.location.href = "../visualizar-nutricionista/"
        
    } else {
        // toastify
    }
}

window.addEventListener("DOMContentLoaded", renderDiet());

window.renderDiet = renderDiet;