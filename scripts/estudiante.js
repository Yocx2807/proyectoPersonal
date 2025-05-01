export function cargarVista() {
  const container = document.getElementById('container');
  container.innerHTML = `
    <h2>Gestión de Estudiantes</h2>
    <button onclick="window.mostrarFormularioEstudiante()">Agregar Estudiante</button>
    <div id="formularioCrearEstudiante" class="formulario-generico" style="display:none;">
      <h3>Nuevo Estudiante</h3>
      <input type="text" id="cedula" placeholder="Cédula" required>
      <input type="text" id="nombre" placeholder="Nombre" required>
      <input type="text" id="apellido" placeholder="Apellido" required>
      <input type="email" id="correo" placeholder="Correo" required>
      <input type="text" id="usuario" placeholder="Usuario" value="EstudianteAdmin" required>
      <button onclick="window.crearEstudiante()">Guardar</button>
    </div>
    <div id="resultadoEstudiantes"></div>
  `;
  window.listarEstudiantes();
}

window.mostrarFormularioEstudiante = function () {
  document.getElementById('formularioCrearEstudiante').style.display = 'block';
};

window.listarEstudiantes = function () {
  fetch('https://paginas-web-cr.com/ApiPHP/apis/ListaEstudiantes.php')
    .then(response => response.json())
    .then(data => {
      const lista = data.data.map(est =>
        `<li>${est.cedula} - ${est.nombre} ${est.apellido} - ${est.correo}</li>`
      ).join('');
      document.getElementById('resultadoEstudiantes').innerHTML = `<ul>${lista}</ul>`;
    })
    .catch(() => {
      document.getElementById('resultadoEstudiantes').innerHTML = `<p>Error al cargar estudiantes.</p>`;
    });
};

window.crearEstudiante = function () {
  const nuevoEstudiante = {
    cedula: document.getElementById('cedula').value,
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    correo: document.getElementById('correo').value,
    usuario: document.getElementById('usuario').value,
  };

  fetch('https://paginas-web-cr.com/ApiPHP/apis/InsertarEstudiantes.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoEstudiante)
  })
    .then(response => response.json())
    .then(data => {
      alert('Estudiante creado');
      window.listarEstudiantes();
      document.getElementById('formularioCrearEstudiante').style.display = 'none';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('No se pudo crear el estudiante.');
    });
};

