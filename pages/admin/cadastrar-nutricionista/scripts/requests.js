const baseurl = "http://localhost:3000"

export async function postNutri() {

    const name = document.getElementById("name").value
    const CRN = document.getElementById("CRN").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const userType = 1;

    // fazendo a requisição completa, endpoint com headers e body
    const response = await fetch(
        `${baseurl}/admin/cadastrar`,
        {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            
            body: JSON.stringify({
                name: name, 
                CRN: CRN,
                email: email, 
                password: password, 
                userType: 1
            })
        }
    )    

    console.log(response.status);
    console.log(response.headers);

    if (response.ok) {
        window.location.href = "../visualizar-nutricionista/"
    }
}

window.postNutri = postNutri;