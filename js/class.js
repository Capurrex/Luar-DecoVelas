//constructora
class velas {
    constructor(id, nombre, precio, imagen, imgAlt, descripcion) {
      (this.id = id), (this.nombre = nombre);
      this.precio = precio;
      this.imagen = imagen;
      this.imgAlt = imgAlt;
      this.descripcion = descripcion;
      this.color = undefined
      this.aroma = undefined
      this.cantidad = 1
    }
  }