// API base URL
const apiUrl = 'https://paginas-web-cr.com/Api/';

// Función para obtener todos los estudiantes
function obtenerEstudiantes() {
    fetch(`${apiUrl}/Estudiantes`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Aquí puedes renderizar los estudiantes en el HTML
        })
        .catch(error => console.error('Error al obtener estudiantes:', error));
}

// Función para insertar un estudiante
function insertarEstudiante(estudiante) {
    fetch(`${apiUrl}/Estudiantes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(estudiante),
    })
    .then(response => response.json())
    .then(data => console.log('Estudiante insertado:', data))
    .catch(error => console.error('Error al insertar estudiante:', error));
}

// Función para modificar un estudiante
function modificarEstudiante(id, estudiante) {
    fetch(`${apiUrl}/Estudiantes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(estudiante),
    })
    .then(response => response.json())
    .then(data => console.log('Estudiante modificado:', data))
    .catch(error => console.error('Error al modificar estudiante:', error));
}

// Función para eliminar un estudiante
function eliminarEstudiante(id) {
    fetch(`${apiUrl}/Estudiantes/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => console.log('Estudiante eliminado:', data))
    .catch(error => console.error('Error al eliminar estudiante:', error));
}

// Función para consultar y mostrar datos de estudiantes
function mostrarEstudiantes() {
    fetch(`${apiUrl}/Estudiantes`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('content');
            data.forEach(estudiante => {
                const div = document.createElement('div');
                div.classList.add('student');
                div.innerHTML = `<p>${estudiante.nombre}</p>`;
                container.appendChild(div);
            });
        })
        .catch(error => console.error('Error al consultar estudiantes:', error));
}

document.addEventListener('DOMContentLoaded', mostrarEstudiantes);
