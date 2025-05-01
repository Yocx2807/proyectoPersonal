window.cargarModulo = function(nombreModulo) {
  const ruta = `./${nombreModulo}.js`;
  import(ruta)
    .then(modulo => {
      document.getElementById('container').innerHTML = '';
      modulo.cargarVista(); // esta función debe estar en cada módulo
    })
    .catch(error => {
      console.error('Error al cargar el módulo:', error);
      document.getElementById('container').innerHTML = `<p>Error al cargar el módulo: ${nombreModulo}</p>`;
    });
}

window.abrirModal = function () {
  document.getElementById('modal').classList.remove('hidden');
};

window.cerrarModal = function () {
  document.getElementById('modal').classList.add('hidden');
};

document.getElementById('modalFormulario').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombreCurso').value;
  const descripcion = document.getElementById('descripcionCurso').value;
  const anno = document.getElementById('annoCurso').value;

  const datos = {
    nombre: nombre,
    descripcion: descripcion,
    anno: anno
  };

  fetch('https://paginas-web-cr.com/ApiPHP/apis/InsertarCursos.php', {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      alert('Curso agregado correctamente');
      cerrarModal();
      window.listarCursos(); // recargar lista
    })
    .catch(error => {
      alert('Error al guardar el curso');
    });
});


  

  