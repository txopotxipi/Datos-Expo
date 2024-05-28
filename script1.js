document.addEventListener('DOMContentLoaded', function() {
    fetch('datos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const padreSelect = document.getElementById('padre-select');
            const elementoSelect = document.getElementById('elemento-select');
            const elementoEliminarSelect = document.getElementById('elemento-eliminar-select');

            data.especialidades.forEach(especialidad => {
                const optionEspecialidad = document.createElement('option');
                optionEspecialidad.value = especialidad.nombre;
                optionEspecialidad.textContent = especialidad.nombre;
                padreSelect.appendChild(optionEspecialidad);
                elementoSelect.appendChild(optionEspecialidad.cloneNode(true));
                elementoEliminarSelect.appendChild(optionEspecialidad.cloneNode(true));

                especialidad.elementos.forEach(elemento => {
                    const optionPadre = document.createElement('option');
                    optionPadre.value = elemento.nombre;
                    optionPadre.textContent = `- ${elemento.nombre}`;
                    padreSelect.appendChild(optionPadre);

                    const optionElemento = document.createElement('option');
                    optionElemento.value = elemento.nombre;
                    optionElemento.textContent = `- ${elemento.nombre}`;
                    elementoSelect.appendChild(optionElemento);
                    elementoEliminarSelect.appendChild(optionElemento.cloneNode(true));

                    elemento.componentes.forEach(componente => {
                        const optionComponente = document.createElement('option');
                        optionComponente.value = componente.nombre;
                        optionComponente.textContent = `-- ${componente.nombre}`;
                        padreSelect.appendChild(optionComponente);

                        const optionComponenteElemento = document.createElement('option');
                        optionComponenteElemento.value = componente.nombre;
                        optionComponenteElemento.textContent = `-- ${componente.nombre}`;
                        elementoSelect.appendChild(optionComponenteElemento);
                        elementoEliminarSelect.appendChild(optionComponenteElemento.cloneNode(true));
                    });
                });
            });

            // Añadir funcionalidad de deshacer
            const lastAction = { action: null, data: null };

            document.getElementById('deshacer-actualizar').addEventListener('click', () => deshacerUltimaAccion());
            document.getElementById('deshacer-insertar').addEventListener('click', () => deshacerUltimaAccion());
            document.getElementById('deshacer-eliminar').addEventListener('click', () => deshacerUltimaAccion());

            document.getElementById('actualizar-form').addEventListener('submit', (e) => {
                lastAction.action = 'actualizar';
                lastAction.data = new FormData(e.target);
            });

            document.getElementById('insertar-form').addEventListener('submit', (e) => {
                lastAction.action = 'insertar';
                lastAction.data = new FormData(e.target);
            });

            document.getElementById('eliminar-form').addEventListener('submit', (e) => {
                lastAction.action = 'eliminar';
                lastAction.data = new FormData(e.target);
            });

            function deshacerUltimaAccion() {
                if (!lastAction.action) {
                    alert('No hay ninguna acción para deshacer');
                    return;
                }

                fetch('actualizar.php', {
                    method: 'POST',
                    body: lastAction.data,
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.text();
                })
                .then(data => {
                    console.log('Acción deshecha:', lastAction.action);
                    location.reload();
                })
                .catch(error => console.error('Error al deshacer la acción:', error));
            }
        })
        .catch(error => console.error('Error cargando los datos:', error));

            // Inicializar Select2 en los elementos <select>
    $('#elemento-select').select2();
    $('#padre-select').select2();
    $('#elemento-eliminar-select').select2();
});
