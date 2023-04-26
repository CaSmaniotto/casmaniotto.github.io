var menu = document.getElementById("menu-lista")
var btn = document.getElementById("menu-hamburger")
btn.addEventListener("click", function () {
    menu.classList.toggle("shown");
});