import { ingredientes, passos } from "./receita.js"

const baseurl = "http://localhost:3000"

function teste() {
    console.log("teste uhul");
}

export async function postReceita(event) {

    event.preventDefault()
    console.log(ingredientes);
    console.log(passos);
    console.log("oioiooioi");

    const name = document.getElementById("nome_receita").value

    const response = await fetch(

        `${baseurl}/user/${JSON.parse(localStorage.getItem("userInfo")).userID}/criar-receita`,
        {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                ingredients: ingredientes,
                steps: passos
            })
        }
    )

    
    if (response.ok) {
        window.location.href = "../visualizar-nutricionista/"
    }

}

window.teste = teste
window.postReceita = postReceita