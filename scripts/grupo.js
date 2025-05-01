export function cargarVista() {
  const container = document.getElementById('container');
  container.innerHTML = `
    <h2>Gestión de Grupos</h2>
    <button onclick="window.mostrarFormularioGrupo()">Agregar Grupo</button>
    <div id="formularioCrearGrupo" class="formulario-generico" style="display:none;">
      <h3>Nuevo Grupo</h3>
      <input type="text" id="nombre" placeholder="Nombre del grupo" required>
      <input type="text" id="descripcion" placeholder="Descripción" required>
      <input type="text" id="usuario" placeholder="Usuario" value="GrupoAdmin" required>
      <button onclick="window.crearGrupo()">Guardar</button>
    </div>
    <div id="resultadoGrupos"></div>
  `;
  window.listarGrupos();
}

window.mostrarFormularioGrupo = function () {
  document.getElementById('formularioCrearGrupo').style.display = 'block';
};

window.listarGrupos = function () {
  fetch('https://paginas-web-cr.com/ApiPHP/apis/ListaGrupo.php')
    .then(res => res.json())
    .then(data => {
      const lista = data.data.map(g =>
        `<li>${g.nombre} - ${g.descripcion}</li>`
      ).join('');
      document.getElementById('resultadoGrupos').innerHTML = `<ul>${lista}</ul>`;
    });
};

window.crearGrupo = function () {
  const nuevoGrupo = {
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    usuario: document.getElementById('usuario').value
  };

  fetch('https://paginas-web-cr.com/ApiPHP/apis/InsertarGrupo.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoGrupo)
  })
    .then(res => res.json())
    .then(data => {
      alert('Grupo agregado correctamente');
      window.listarGrupos();
      document.getElementById('formularioCrearGrupo').style.display = 'none';
    });
};
