import {
    CursoModel
} from "../model/CursoModel.js";

const URLAPI = 'https://paginas-web-cr.com/Api/apis/';
const lista = 'ListaCurso.php';
const crea = 'InsertarCursos.php';
const actualiza = 'ActualizarCursos.php';
const elimina = 'BorrarCursos.php';

const mensajeCompletado = `
<div
              class="alert alert-success alert-dismissible fade show"
              role="alert"
          >
              <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
              ></button>
              <strong>Proceso</strong> Exitoso!!!
          </div>`;

const mensajeEliminar = `
<div
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
          >
              <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
              ></button>
              <strong>Eliminacion</strong> Exitosa!!!
          </div>`;


document.addEventListener('DOMContentLoaded', () => {
    obtenerDatos();


    document.getElementById('formualCrear').addEventListener('submit', (eventos) => {
        eventos.preventDefault();
        crearCursos();
    })

    document.getElementById('formualEditar').addEventListener('submit', (eventos) => {
        eventos.preventDefault();
        actualizarCursos();
    })

    
    document.getElementById('formualEliminar').addEventListener('submit', (eventos) => {
        eventos.preventDefault();
        eliminarCursos();
    })


    


});


function obtenerDatos() {


    fetch(`${URLAPI}${lista}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(
            data => datosTabla(data.data)
        )
        .catch(error => console.error(error));

}

function datosTabla(data) {
   // console.log(data);

    const datostabla = document.getElementById('datostabla');
    datostabla.innerHTML = '';

    data.forEach(element => {

        //     id, nombre, descripcion, tiempo, usuario
        let fila = `
                     <tr class="">
                         <td scope="row">${element.id}</td>
                         <td>${element.nombre}</td>
                         <td>${element.descripcion}</td>
                         <td>${element.tiempo}</td>
                         <td>${element.usuario}</td>
                            <td>                    
                                <a
                                    name=""
                                    id=""
                                    class="btn btn-danger"
                                    onclick="eliminarCursos(${element.id})"
                                    role="button"
                                    >Eliminar</a
                                >
                                
                                --- 
                                <a
                                    name=""
                                    id=""
                                    class="btn btn-primary"
                                    onclick="editarCursos(${element.id},'${element.nombre}','${element.descripcion}','${element.tiempo}','${element.usuario}')"
                                    role="button"
                                    >Editar</a
                                >
                                

                            </td>
                     </tr>        
                 `;

        datostabla.innerHTML += fila;
    });

}


function crearCursos() {

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const tiempo = document.getElementById('tiempo').value;
    const usuario = 'Prof Jimenez';

    const nuevoDato = new CursoModel(null, nombre, descripcion, tiempo, usuario);


    fetch(`${URLAPI}${crea}`, {
            method: 'POST',
            body: JSON.stringify(nuevoDato)
        })
        .then(response => response.json())
        .then(
            data => finalzarCrear(data)
        )
        .catch(error => console.error(error))

}


function finalzarCrear(data) {
    obtenerDatos();

    const mensajes = document.getElementById('mensajes');
    mensajes.innerHTML = mensajeCompletado;

    const modalCrear = bootstrap.Modal.getInstance(document.getElementById('modalCrear'));

    modalCrear.hide();
}

window.editarCursos = (id, nombre, descripcion, tiempo, usuario) => {

    document.getElementById('ideditar').value = id;
    document.getElementById('nombreeditar').value = nombre;
    document.getElementById('descripcioneditar').value = descripcion;
    document.getElementById('tiempoeditar').value = tiempo;
    document.getElementById('usuarioeditar').value = usuario;

    const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));

    modalEditar.show();

}

function actualizarCursos() { 

   const id = document.getElementById('ideditar').value; 
   const nombre = document.getElementById('nombreeditar').value;
   const descripcion = document.getElementById('descripcioneditar').value ;
   const tiempo = document.getElementById('tiempoeditar').value;
   const usuario = document.getElementById('usuarioeditar').value;

   const nuevoDato = new CursoModel(id, nombre, descripcion, tiempo, usuario);


   fetch(`${URLAPI}${actualiza}`, {
           method: 'POST',
           body: JSON.stringify(nuevoDato)
       })
       .then(response => response.json())
       .then(
           data => finalzarActualizar(data)
       )
       .catch(error => console.error(error))
 }


 function finalzarActualizar(data){
    obtenerDatos();

    const mensajes = document.getElementById('mensajes');
    mensajes.innerHTML = mensajeCompletado;

    const modalEditar = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));

    modalEditar.hide();
 }


 window.eliminarCursos = (id) => {

    document.getElementById('ideliminar').value = id;


    const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));

    modalEliminar.show();

}



function eliminarCursos(){
    
   const id = document.getElementById('ideliminar').value; 
  
   fetch(`${URLAPI}${elimina}`, {
           method: 'POST',
           body: JSON.stringify({id: id})
       })
       .then(response => response.json())
       .then(
           data => finalzarEliminaar(data)
       )
       .catch(error => console.error(error))
}

function finalzarEliminaar(){
    obtenerDatos();

    const mensajes = document.getElementById('mensajes');
    mensajes.innerHTML = mensajeEliminar;

    const modalEliminar = bootstrap.Modal.getInstance(document.getElementById('modalEliminar'));

    modalEliminar.hide();    
}