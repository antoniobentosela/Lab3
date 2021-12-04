class Vehiculo {
  constructor(id, marca, modelo, precio) {
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.precio = precio;
  }
}

class Auto extends Vehiculo {
  constructor(id, marca, modelo, precio, cantidadDePuertas) {
    super(id, marca, modelo, precio);
    this.cantidadDePuertas = cantidadDePuertas;
  }
}

class Camioneta extends Vehiculo {
  constructor(id, marca, modelo, precio, cuatroXcuatro) {
    super(id, marca, modelo, precio);
    this.cuatroXcuatro = cuatroXcuatro;
  }
}


