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
                "Authporizatoin": token,
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

    const token = Token.sign(
        { id: user.id, type: user.userType },
        "secret",
        {  }
    )

    const data = await response.json();
    console.log('Token:', data.token);
    console.log(response.status);
    console.log(response.headers);

    localStorage.setItem("token", data.token)

    if (response.ok) {
        window.location.href = "../pages/admin/TOKEN"
    }
}
window.signIn = signIn;