let botao = document.getElementById("mod");
let main = document.getElementById("main");
let body = document.getElementById("body");
let header = document.getElementById("header");
let redod = document.getElementById("redod");
let redod2 = document.getElementById("redod2");
let config = document.getElementById("config");
let edit = document.getElementById("edit");

var staatus = true;

function troca() {
    if (staatus == true) {
        config.classList.add("camada2")
        config.classList.remove("luz2")
        edit.classList.add("camada3")
        edit.classList.remove("luz")
        redod.classList.add("camada3")
        redod.classList.remove("luz")
        redod2.classList.add("camada3")
        redod2.classList.remove("luz")
        header.classList.add("darkbox")
        header.classList.remove("lightbox")
        body.classList.add("dark")
        main.classList.add("dark")
        botao.classList.add("escuro");
        botao.classList.remove("claro");
        botao.style.animation = 'desligar 0.5s ease';
        staatus = false;
    }
    else
    {   
        config.classList.add("luz2")
        config.classList.remove("camada2")
        edit.classList.add("luz")
        edit.classList.remove("camada3")
        redod2.classList.add("luz")
        redod2.classList.remove("camada3")
        redod.classList.add("luz")
        redod.classList.remove("camada3")
        header.classList.add("lightbox")
        header.classList.remove("darkbox")
        body.classList.remove("dark")
        main.classList.remove("dark")
        botao.classList.add("claro");
        botao.classList.remove("escuro");
        botao.style.animation = 'ligar 0.5s ease';
        staatus = true;
    }
}