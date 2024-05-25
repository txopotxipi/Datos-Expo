document.getElementById('formulario').addEventListener('submit', function(event) {
    // Prevenir el comportamiento por defecto del formulario
    event.preventDefault();

    // Obtener los valores del formulario
    var nombre = document.getElementById('nombre').value;
    var valor = document.getElementById('valor').value;

    // Crear un objeto con los datos
    var datos = {
        nombre: nombre,
        valor: valor
    };

    // Enviar los datos al servidor
    fetch('actualizar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Error:', error));
});
