let btn = document.getElementById("password-span");
let password = document.getElementById("password");

console.log(btn);


btn.addEventListener("click", () => {
    if (btn.innerText == "🙈") {
        password.setAttribute("type", "text")
        btn.innerText = "🐵"
    } else {
        password.setAttribute("type", "password")
        btn.innerText = "🙈"
    }
})