/*menu hamburger*/
var menu = document.getElementById("menu-lista")
var btn = document.getElementById("menu-hamburger")
btn.addEventListener("click", function () {
    menu.classList.toggle("shown");
});

/*mudança de cor da navbar*/
var navbar = document.querySelector('.navbar')
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else if (window.scrollY <= 50) {
        navbar.classList.remove('scrolled');
    }
})