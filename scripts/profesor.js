export function cargarVista() {
  const container = document.getElementById('container');
  container.innerHTML = `
    <h2>Gestión de Profesores</h2>
    <button onclick="window.mostrarFormularioProfesor()">Agregar Profesor</button>
    <div id="formularioCrearProfesor" class="formulario-generico" style="display:none;">
      <h3>Nuevo Profesor</h3>
      <input type="text" id="cedula" placeholder="Cédula" required>
      <input type="text" id="nombre" placeholder="Nombre" required>
      <input type="text" id="apellido" placeholder="Apellido" required>
      <input type="email" id="correo" placeholder="Correo" required>
      <input type="text" id="usuario" placeholder="Usuario" value="AdminProf" required>
      <button onclick="window.crearProfesor()">Guardar</button>
    </div>
    <div id="resultadoProfesores"></div>
  `;
  window.listarProfesores();
}

window.mostrarFormularioProfesor = function () {
  document.getElementById('formularioCrearProfesor').style.display = 'block';
};

window.listarProfesores = function () {
  fetch('https://paginas-web-cr.com/ApiPHP/apis/ListaProfesores.php')
    .then(res => res.json())
    .then(data => {
      const lista = data.data.map(p =>
        `<li>${p.cedula} - ${p.nombre} ${p.apellido} - ${p.correo}</li>`
      ).join('');
      document.getElementById('resultadoProfesores').innerHTML = `<ul>${lista}</ul>`;
    });
};

window.crearProfesor = function () {
  const nuevo = {
    cedula: document.getElementById('cedula').value,
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    correo: document.getElementById('correo').value,
    usuario: document.getElementById('usuario').value
  };

  fetch('https://paginas-web-cr.com/ApiPHP/apis/InsertarProfesores.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevo)
  })
    .then(res => res.json())
    .then(data => {
      alert('Profesor agregado correctamente');
      window.listarProfesores();
      document.getElementById('formularioCrearProfesor').style.display = 'none';
    });
};
