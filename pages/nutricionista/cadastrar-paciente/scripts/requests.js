const baseurl = "http://localhost:3000"

document.getElementById("fileInput").addEventListener("change", () => console.log("mudei"))

export async function postPacient(event) {

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const userType = 2;

    if (name == "" || email == "" || password == "") {
        alert("Por favor, insira corretamente os campos solicitados.")
        
    } else {
        // fazendo a requisição completa, endpoint com headers e body
        const formData = new FormData()
        formData.append("photo", document.getElementById("fileInput").files[0])
        const imageResponse = await fetch(`${baseurl}/files`, {
            method: "POST",
            body: formData
        }) 
        const imageUrl = (await imageResponse.json()).filePath
 
        const response = await fetch(
            `${baseurl}/nutri/${JSON.parse(localStorage.getItem("userInfo")).Nutricionist.nutricionistID}/cadastrar-paciente`,
            {
                method: "POST",
                headers: {
                    "Authorization": localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },  
                
                body: JSON.stringify({
                    name: name, 
                    email: email, 
                    password: password, 
                    userType: userType,
                    profilePicture: imageUrl
                })
            }
        )

        const data = await response.json()

        if (response.ok) {
            // window.location.href = "../meus-pacientes/"
            document.getElementById("pacientInfo").setAttribute("value", data.pacient.pacientID)

        }

        event.target.parentElement.submit();
    }
}

window.postPacient = postPacient;
