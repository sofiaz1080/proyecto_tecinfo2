document.addEventListener('DOMContentLoaded', function() {
    const carrusel = document.querySelector('.carrusel');
    const slides = document.querySelectorAll('.slide');
    const anterior = document.querySelector('.anterior');
    const siguiente = document.querySelector('.siguiente');
    let indice = 0;

    function mostrarSlide(n) {
        if (n < 0) {
            indice = slides.length - 1;
        } else if (n >= slides.length) {
            indice = 0;
        }
        carrusel.style.transform = `translateX(-${indice * 100}%)`;
    }

    function siguienteSlide() {
        mostrarSlide(indice + 1);
    }

    function anteriorSlide() {
        mostrarSlide(indice - 1);
    }

    anterior.addEventListener('click', anteriorSlide);
    siguiente.addEventListener('click', siguienteSlide);

    // Mostrar el primer slide al cargar la página
    mostrarSlide(indice);
});