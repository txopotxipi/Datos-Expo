// Obtener los datos desde el archivo JSON
let datos;
fetch('datos.json')
  .then(response => response.json())
  .then(data => {
    datos = data;
    crearMenuAcordeon();
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });

function crearMenuAcordeon() {
  const menuAcordeon = document.getElementById('menu-acordeon');
  const titulo = document.getElementById('titulo');
  titulo.textContent = datos.titulo;

  datos.especialidades.forEach(especialidad => {
    if (especialidad.esTitulo) {
      // Si es el título, crea un <h2> y aplica los estilos deseados
      const tituloElemento = document.createElement('h2');
      tituloElemento.textContent = especialidad.nombre;
      tituloElemento.style.backgroundColor = 'white'; // Fondo blanco
      tituloElemento.style.pointerEvents = 'none'; // No seleccionable
      menuAcordeon.appendChild(tituloElemento);
    } else {
      // Si no es el título, crea el acordeón normalmente
      const acordeonItem = document.createElement('div');
      acordeonItem.classList.add('acordeon-item');

      const acordeonTitulo = document.createElement('div');
      acordeonTitulo.classList.add('acordeon-titulo');
      acordeonTitulo.textContent = `${especialidad.nombre} - ${especialidad.valor}`;
      // Añade la clase 'titulo-destacado' si el nombre de la especialidad es ' MUJERES OPERATIVAS'
      if (especialidad.nombre === "UNIFORMIDADES DE LA MUJER") {
        acordeonTitulo.classList.add('titulo-destacado');
      }

      acordeonTitulo.addEventListener('click', () => {
        const contenido = acordeonTitulo.nextElementSibling;
        contenido.style.display = contenido.style.display === 'none' ? 'block' : 'none';
      });

      const acordeonContenido = document.createElement('div');
      acordeonContenido.classList.add('acordeon-contenido');

      especialidad.elementos.forEach(elemento => {
        const subAcordeonItem = document.createElement('div');
        subAcordeonItem.classList.add('sub-acordeon-item');

        const subAcordeonTitulo = document.createElement('div');
        subAcordeonTitulo.classList.add('acordeon-titulo');
        subAcordeonTitulo.textContent = `${elemento.nombre} - ${elemento.valor || ''}`;

        subAcordeonTitulo.addEventListener('click', () => {
          const contenido = subAcordeonTitulo.nextElementSibling;
          contenido.style.display = contenido.style.display === 'none' ? 'block' : 'none';
        });

        const subAcordeonContenido = document.createElement('div');
        subAcordeonContenido.classList.add('acordeon-contenido');

        elemento.componentes.forEach(componente => {
          const componenteItem = document.createElement('div');
          componenteItem.textContent = `${componente.nombre} - ${componente.valor}`;
          subAcordeonContenido.appendChild(componenteItem);
        });

        subAcordeonItem.appendChild(subAcordeonTitulo);
        subAcordeonItem.appendChild(subAcordeonContenido);
        acordeonContenido.appendChild(subAcordeonItem);
      });

      acordeonItem.appendChild(acordeonTitulo);
      acordeonItem.appendChild(acordeonContenido);
      menuAcordeon.appendChild(acordeonItem);
    }
  });
}