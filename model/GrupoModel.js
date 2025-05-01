export class GrupoModel {
    constructor(id = null, nombre, descripcion, cursoId, profesorId, usuario) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.cursoId = cursoId;
      this.profesorId = profesorId;
      this.usuario = usuario;
    }
  }
  