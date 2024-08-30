async function getNutri() {

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    // fazendo a requisição completa, endpoint com headers e body
    const response = await fetch(
        `${baseurl}/admin/nutris`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )    

    return await response.json()
}
window.signIn = signIn;