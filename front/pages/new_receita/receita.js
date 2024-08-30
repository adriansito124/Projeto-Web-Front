var ingredientes = [];
var passos = [];
var qtd = [];

function adicionarIngrediente(event) {
    event.preventDefault();
    console.log("aiai");
    let valor = document.getElementById("input-ingredient").value;
    let colunas = document.getElementById("ingredients");

    colunas.innerHTML = "";

    ingredientes.push(valor);

    console.log(ingredientes);

    ingredientes.forEach((ingrediente, index) => {

        colunas.insertAdjacentHTML("beforeend",
            `<div class="linha">
                    <input id="qtd" class="min redod2 reto2" type="number" value="1">
                    <div class="max2 redod reto" type="text">${ingrediente}</div>
                    <button id="${index}" onclick="deletarIngrediente(event, ${index})" class="excluir">X${index}</button>
            </div>`
        )
    })

    document.getElementById("input-ingredient").value = ""
}

function deletarIngrediente(event, index) {
    event.preventDefault();
    ingredientes.splice(index, 1);

    let colunas = document.getElementById("ingredients");
    colunas.innerHTML = "";

    console.log(ingredientes);

    ingredientes.forEach((ingrediente, i) => {

        colunas.insertAdjacentHTML("beforeend",
            `<div class="linha">
                    <input class="min redod2 reto2" type="number" value="1">
                    <div class="max2 redod reto" type="text">${ingrediente}</div>
                    <button onclick="deletarIngrediente(event, ${i})" class="excluir">X</button>
            </div>`
        )
    })

}

function adicionarPasso(event) {
    event.preventDefault();
    console.log("aiai");
    let valor = document.getElementById("input-step").value;
    let colunas = document.getElementById("steps");

    colunas.innerHTML = "";

    passos.push(valor);

    console.log(passos);

    passos.forEach((passo, index) => {

        colunas.insertAdjacentHTML("beforeend",
            `<div class="linha">
                <div class="max redod reto" type="text">${index+1}- ${passo}</div>
                <button id="${index}" onclick="deletarPasso(event, ${index})" class="excluir">X</button>
            </div>`
        )
    })

    document.getElementById("input-step").value = ""

}

function deletarPasso(event, index) {
    event.preventDefault();
    passos.splice(index, 1);

    let colunas = document.getElementById("steps");
    colunas.innerHTML = "";

    console.log(passos);

    passos.forEach((passo, i) => {

        colunas.insertAdjacentHTML("beforeend",
            `<div class="linha">
                <div class="max redod reto" type="text">${i+1}- ${passo}</div>
                <button onclick="deletarPasso(event, ${i})" class="excluir">X</button>
            </div>`
        )
    })

}
