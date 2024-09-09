import { renderProfile } from "./renderHeader.js"

const baseurl = "http://localhost:3000"

export async function getInfo() {

    const response = await fetch(
        `${baseurl}/user/${JSON.parse(localStorage.getItem("userInfo")).userID}/getInfo`,
        {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }
    )

    // return await response.json()

    if (response.ok) {
       renderProfile(await response.json()) 
    }
}

export async function updateUser() {

    const name = document.getElementById("name-input").value
    const email = document.getElementById("email-input").value
    const newPassword = document.getElementById("new-ps-input").value
    const oldPassword = document.getElementById("old-ps-input").value


    const body = {
        name,
        email,
        oldPassword
    } 
    
    if (newPassword.length > 0) {
        body.newPassword = newPassword
    }
    
    const response = await fetch(
        `${baseurl}/user/${JSON.parse(localStorage.getItem("userInfo")).userID}/updateInfo`,
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
        console.log(await response.json());
        
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

        Toastify({
            text: "Informações aletardas com sucesso!",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              },
            duration: 2000
        }).showToast();
        
    } else {
        console.log(await response.json());

        Toastify({
            text: "Senha antiga inválida!",
            style: {
                background: "linear-gradient(to right, rgba(255,78,0,1), rgba(255,171,0,1)"
              },
            duration: 2000
        }).showToast();

    }

    
}
window.updateUser = updateUser
document.addEventListener("DOMContentLoaded", getInfo)