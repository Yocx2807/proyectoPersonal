export function cargarVista() {
  const container = document.getElementById('container');
  container.innerHTML = `
    <h2>Gestión de Cursos</h2>
    <button onclick="window.mostrarFormularioCurso()">Agregar Curso</button>
    <div id="formularioCrearCurso" class="formulario-generico" style="display: none;">
  <h3>Agregar Nuevo Curso</h3>
  
  <label for="nombre">Nombre del curso:</label>
  <input type="text" id="nombre" placeholder="Nombre del curso" required>

  <label for="descripcion">Descripción:</label>
  <textarea id="descripcion" placeholder="Descripción del curso" required></textarea>

  <label for="tiempo">Tiempo (horas):</label>
  <input type="number" id="tiempo" placeholder="Duración en horas" required>

  <button onclick="crearCursos()">Crear Curso</button>
</div>

  `;
  window.listarCursos(); // <-- importante
}

// Mostrar formulario
window.mostrarFormularioCurso = function () {
  document.getElementById('formularioCrearCurso').style.display = 'block';
};

window.listarCursos = function () {
  fetch('https://paginas-web-cr.com/ApiPHP/apis/ListaCurso.php')
    .then(response => response.json())
    .then(data => {
      const lista = data.data.map(curso =>
        `<li>${curso.nombre} - ${curso.descripcion}</li>`
      ).join('');
      document.getElementById('resultadoCursos').innerHTML = `<ul>${lista}</ul>`;
    })
    .catch(error => {
      document.getElementById('resultadoCursos').innerHTML = `<p>Error al cargar los cursos.</p>`;
    });
}

function crearCursos() {
  // Obtener los valores del formulario
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;
  const tiempo = document.getElementById('tiempo').value;
  const usuario = 'Prof Jimenez'; // El nombre del profesor, puedes cambiarlo según el contexto

  // Crear un nuevo objeto CursoModel (este modelo debe estar definido previamente)
  const nuevoDato = new CursoModel(null, nombre, descripcion, tiempo, usuario);

  // Llamar a la API para crear el curso
  fetch('https://paginas-web-cr.com/ApiPHP/apis/CrearCurso.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'  // Asegurarse de enviar los datos en formato JSON
      },
      body: JSON.stringify(nuevoDato)  // Convertir el objeto a JSON
  })
  .then(response => response.json())
  .then(data => {
      // Si la creación es exitosa, puedes realizar alguna acción como mostrar un mensaje de éxito
      alert('Curso creado exitosamente');
      // Llamar a una función para manejar la respuesta, si es necesario
      finalizarCrear(data);
  })
  .catch(error => {
      // Manejar errores de la solicitud fetch
      console.error('Error al crear el curso:', error);
      alert('Hubo un problema al crear el curso.');
  });
}

function finalizarCrear(data) {
  // Aquí puedes manejar lo que se debe hacer después de crear el curso.
  console.log('Curso creado:', data);
  // Opcionalmente, puedes hacer que se recargue la lista de cursos o mostrar un mensaje.
  document.getElementById('container').innerHTML = `<p>Curso creado exitosamente</p>`;
}




