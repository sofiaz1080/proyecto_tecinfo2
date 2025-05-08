document.addEventListener('DOMContentLoaded', function() {
    const miBoton = document.getElementById('miBoton');

    if (miBoton) {
        miBoton.addEventListener('click', function() {
            alert('¡Gracias por tu interés en Hambre Cero!');
            // Aquí puedes agregar más funcionalidades al botón, como redirigir a una página de donación.
        });
    }
});