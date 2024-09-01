const baseurl = "http://localhost:3000"

async function signIn() {

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    // fazendo a requisição completa, endpoint com headers e body
    const response = await fetch(
        `${baseurl}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // infelizmente, precisamos mandar o body da requisição como uma string
            // pra isso, usamos o JSON.stringfy(), que transform qualquer tipo de variável javascript em texto
            body: JSON.stringify({
                email: email, 
                password: password
            })
        }
    )    

    const data = await response.json();
    
    localStorage.setItem("token", data.token)
    localStorage.setItem("userInfo", JSON.stringify(data.userInfo))
    
    if (response.ok) {
        switch (data.userInfo.userType) {
            case 0:
                window.location.href = "../admin/visualizar-nutricionista"
                break;

            case 1:
                window.location.href = "../nutricionista/meus-pacientes/"
                break;

            case 2:
                window.location.href = "../paciente/home/"
                break;
            default:
                break;
        }
        console.log(data);
    }

}   

window.signIn = signIn;