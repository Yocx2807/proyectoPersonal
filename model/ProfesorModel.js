export class ProfesorModel {
    constructor(id = null, cedula, nombre, primerApellido, segundoApellido, correo, usuario) {
      this.id = id;
      this.cedula = cedula;
      this.nombre = nombre;
      this.primerApellido = primerApellido;
      this.segundoApellido = segundoApellido;
      this.correo = correo;
      this.usuario = usuario;
    }
  }
  