export async function renderizarNutriPorID(res) {
    document.getElementById("card-title").textContent = res.name;
    document.getElementById("name").value = res.name;
    document.getElementById("CRN").value = res.Nutricionist.CRN;
    document.getElementById("email").value = res.email;
    document.getElementById("password").value = "";

}