let botao = document.getElementById("mod");
var staatus = localStorage.getItem('darkMode') === 'true';
console.log(staatus)

function troca() {

    staatus = staatus ? false : true
    localStorage.setItem("darkMode", staatus)

    let body = document.body

    if (localStorage.getItem("darkMode") == "true" ) {

        body.setAttribute("data-bs-theme", "dark") 
        botao.classList.add("escuro")
        botao.classList.remove("claro")
    } else {
        body.setAttribute("data-bs-theme", "light") 
        botao.classList.add("claro")
        botao.classList.remove("escuro")
    }
    

}

document.addEventListener("DOMContentLoaded", () => {
    let body = document.body

    if (localStorage.getItem("darkMode") == "true" ) {

        body.setAttribute("data-bs-theme", "dark") 
    } else {
        body.setAttribute("data-bs-theme", "light") 
    }
})

window.troca = troca
