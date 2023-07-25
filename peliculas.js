// Obtenemos el formulario y el campo para subir la imagen
const formulario = document.getElementById('formularioPelicula');
const contenedorPeliculas = document.getElementById('peliculasGuardadas');

// Obtenemos las películas almacenadas en el localStorage (si existen)
let peliculas = [];

// Agregamos el evento de submit al formulario
formulario.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitamos que el formulario se envíe por defecto

  // Obtenemos los valores ingresados por el usuario
  const nombre = formulario.elements['nombre'].value;
  const anio = formulario.elements['anio'].value;
  const director = formulario.elements['director'].value;
  const descripcion = formulario.elements['descripcion'].value;
  const imagenURL = formulario.elements['imagenURL'].value; // Obtenemos la URL de imagen ingresada

  // Creamos un objeto película con los datos ingresados
  const pelicula = {
    nombre: nombre,
    anio: anio,
    director: director,
    descripcion: descripcion,
    imagenURL: imagenURL // Incluimos la URL de imagen en el objeto de la película
  };

  // Agregamos la película al arreglo de películas
  peliculas.push(pelicula);

  // Almacenamos el arreglo de películas actualizado en el localStorage
  localStorage.setItem('peliculas', JSON.stringify(peliculas));

  // Mostramos la película en la página
  mostrarPelicula(pelicula);

  // Limpiamos el formulario
  formulario.reset();
});

// Mostramos las películas almacenadas en el localStorage al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  peliculas = JSON.parse(localStorage.getItem('peliculas')) || [];
  cargarPeliculas();
});

function cargarPeliculas() {
  peliculas.forEach((pelicula) => mostrarPelicula(pelicula));
}

function mostrarPelicula(pelicula) {
  const peliculaDiv = document.createElement('div');
  peliculaDiv.classList.add('pelicula');

  const imagen = document.createElement('img');

  if (pelicula.imagenURL) {
    imagen.setAttribute('src', pelicula.imagenURL);
    imagen.setAttribute('alt', pelicula.nombre);
  } else {
    imagen.setAttribute('src', 'ruta-de-imagen-por-defecto.jpg');
    imagen.setAttribute('alt', 'Imagen no disponible');
  }

  const nombre = document.createElement('h3');
  nombre.textContent = pelicula.nombre;

  const anio = document.createElement('p');
  anio.textContent = 'Año: ' + pelicula.anio;

  const director = document.createElement('p');
  director.textContent = 'Director: ' + pelicula.director;

  const descripcion = document.createElement('p');
  descripcion.textContent = pelicula.descripcion;

  const botonEliminar = document.createElement('button');
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.addEventListener('click', function () {
    // Confirmar si se desea eliminar la película
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta película?');
    if (confirmacion) {
      // Eliminar la película del arreglo
      const indice = peliculas.indexOf(pelicula);
      peliculas.splice(indice, 1);

      // Almacenamos el arreglo de películas actualizado en el localStorage
      localStorage.setItem('peliculas', JSON.stringify(peliculas));

      // Eliminar la película del DOM
      contenedorPeliculas.removeChild(peliculaDiv);
    }
  });

  peliculaDiv.appendChild(imagen);
  peliculaDiv.appendChild(nombre);
  peliculaDiv.appendChild(anio);
  peliculaDiv.appendChild(director);
  peliculaDiv.appendChild(descripcion);
  peliculaDiv.appendChild(botonEliminar);

  contenedorPeliculas.appendChild(peliculaDiv);
}
