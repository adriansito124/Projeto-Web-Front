let botao = document.getElementById("mod");
let main = document.querySelector("#main");
let body = document.getElementById("body");
let header = document.getElementById("header");
let redod = document.getElementById("redod");
let redod2 = document.getElementById("redod2");
let config = document.getElementById("config");
let edit = document.getElementById("edit");

var staatus = localStorage.getItem('darkMode') === 'true';
console.log(staatus)

function aplicaTemaEscuro() {

    header.classList.add("darkbox");
    header.classList.remove("lightbox");
    body.classList.add("dark");
    main.classList.add("dark");

}

function aplicaTemaClaro() {
    header.classList.add("lightbox");
    header.classList.remove("darkbox");
    body.classList.remove("dark");
    main.classList.remove("dark");
}

function perfildark() {
    config.classList.add("camada2")
    config.classList.remove("luz2")
    redod.classList.add("camada3")
    redod.classList.remove("luz")
    redod2.classList.add("camada3")
    redod2.classList.remove("luz")
}

function perfillight() {
    config.classList.remove("camada2")
    config.classList.add("luz2")
    redod.classList.add("luz")
    redod.classList.remove("camada3")
    redod2.classList.remove("camada3")
    redod2.classList.add("luz")
}


if (staatus) {
    aplicaTemaEscuro();
    perfildark();


} else {
    aplicaTemaClaro();
    perfillight();
}

console.log(localStorage.getItem('darkMode'));

function troca() {

    if (staatus) {
        aplicaTemaClaro();
        localStorage.setItem('darkMode', 'false');
        botao.classList.add("claro");
        botao.classList.remove("escuro");
        botao.style.animation = 'ligar 0.5s ease';
        perfillight();
        staatus = false;
    } else {
        aplicaTemaEscuro();
        localStorage.setItem('darkMode', 'true');
        botao.classList.add("escuro");
        botao.classList.remove("claro");
        botao.style.animation = 'desligar 0.5s ease';
        perfildark();
        staatus = true;
    }
}
