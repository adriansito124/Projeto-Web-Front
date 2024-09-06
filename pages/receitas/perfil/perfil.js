let botao = document.getElementById("mod");

let staatus = true;

function troca() {
    if (staatus == true) {
        botao.classList.add("escuro");
        botao.classList.remove("claro");
        botao.style.animation = 'desligar 0.5s ease';
        staatus = false;
    }
    else
    {
        botao.classList.add("claro");
        botao.classList.remove("escuro");
        botao.style.animation = 'ligar 0.5s ease';
        staatus = true;
    }
}