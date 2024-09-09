export var ingredientes = [];
export var passos = []; 

function adicionarIngrediente(event) {
    event.preventDefault();
    console.log("aiai");
    let valor = document.getElementById("input-ingredient").value;
    let qtd = document.getElementById("quanti").value;
    let medida = document.getElementById("medida").value;
    let colunas = document.getElementById("ingredients");

    

    colunas.innerHTML = "";

    ingredientes.push({"name" : valor, "quantity": qtd, "measure": medida})

    // ingredientes.push(valor);
    // quantidade.push(qtd);
    
    document.getElementById("input-ingredient").value = "";
    document.getElementById("quanti").value = "1";

    console.log(ingredientes);

    ingredientes.forEach((ingrediente, index) => {

        colunas.insertAdjacentHTML("beforeend",
            `<div class="linha">
            <div class="max2 redod reto" type="text">${ingrediente.name}</div>
                    <div id="qtd" class="min redod2 reto2" type="number">${ingrediente.quantity}  ${ingrediente.measure} </div>
                    <button id="${index}" onclick="deletarIngrediente(${index})" class="excluir">X</button>
            </div>`
        )
    })

    
}

function deletarIngrediente(index) {
    ingredientes.splice(index, 1);
    // quantidade.splice(index, 1); // Remover a quantidade associada

    atualizarIngredientes();
}

function atualizarIngredientes() {
    let colunas = document.getElementById("ingredients");
    colunas.innerHTML = "";

    ingredientes.forEach((ingrediente, index) => {
        colunas.insertAdjacentHTML("beforeend",
            `<div class="linha">
                <div id="qtd" class="min redod2 reto2" type="number">${ingrediente.quantity}</div>
                <div class="max2 redod reto" type="text">${ingrediente.name}</div>
                <button onclick="deletarIngrediente(${index})" class="excluir">X</button>
            </div>`
        )
    });
}


function adicionarPasso(event) {
    event.preventDefault();
    console.log("aiai");
    let valor = document.getElementById("input-step").value;
    let colunas = document.getElementById("steps");

    colunas.innerHTML = "";

    passos.push({"description": valor});

    document.getElementById("input-step").value = "";

    console.log(passos);

    passos.forEach((passo, index) => {

        colunas.insertAdjacentHTML("beforeend",
            `<div class="linha">
                <div class="max redod reto" type="text">${index+1}- ${passo.description}</div>
                <button id="${index}" onclick="deletarPasso(${index})" class="excluir">X</button>
            </div>`
        )
    })

}

function deletarPasso(index) {
    passos.splice(index, 1);

    let colunas = document.getElementById("steps");
    colunas.innerHTML = "";

    console.log(passos);

    passos.forEach((passo, i) => {

        colunas.insertAdjacentHTML("beforeend",
            `<div class="linha">
                <div class="max redod reto" type="text">${i+1}- ${passo}</div>
                <button onclick="deletarPasso(${i})" class="excluir">X</button>
            </div>`
        )
    })

}



window.adicionarIngrediente = adicionarIngrediente
window.deletarIngrediente = deletarIngrediente
window.atualizarIngredientes = atualizarIngredientes
window.adicionarPasso = adicionarPasso
window.deletarPasso = deletarPasso

