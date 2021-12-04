var vehiculos = [];

window.addEventListener("load", function () {
  llenarSelect();
  llenarSelectFiltro();
  getClientes();
  document.getElementById("id").disabled = true;
  document.getElementById("prom").disabled = true;
});

function $(id) {
  return document.getElementById(id);
}

function llenarSelect() {
  let select = $("tipo");
  let opcion = document.createElement("option");
  opcion.innerHTML = "Camioneta";
  opcion.value = "Camioneta";
  let opcion2 = document.createElement("option");
  opcion2.innerHTML = "Auto";
  opcion2.value = "Auto";
  select.appendChild(opcion);
  select.appendChild(opcion2);
}

function llenarSelectFiltro() {
  let select_filtro = $("tipo_filtro");
  let opcion = document.createElement("option");
  opcion.innerHTML = "Camioneta";
  opcion.value = "Camioneta";
  let opcion2 = document.createElement("option");
  opcion2.innerHTML = "Auto";
  opcion2.value = "Auto";
  select_filtro.appendChild(opcion);
  select_filtro.appendChild(opcion2);
}

function getClientes() {
  promesa = new Promise(getDatos);
  promesa.then(getDatosExitoso).catch(errorGetDatos);
}

async function getDatos(exito, error) {
  try {
    let respuesta = await fetch("http://localhost:3001/vehiculos", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log("Response Status:" + respuesta.status.toString());
    respuesta.json().then((elementos) => {
      exito(elementos);
    });
  } catch (error) {
    console.log("Con Error:" + error);
  }
}

function getDatosExitoso(exito) {
  exito.forEach((element) => {
    if (element.cantidadPuertas != null) {
      let vehiculo = new Auto(
        element.id,
        element.make,
        element.model,
        element.price,
        element.cantidadPuertas
      );
      vehiculos.push(vehiculo);
    } else {
      let vehiculo2 = new Camioneta(
        element.id,
        element.make,
        element.model,
        element.price,
        element.cuatroXcuatro
      );
      vehiculos.push(vehiculo2);
    }
  });
  llenarTabla(vehiculos);
}

function errorGetDatos() {
  alert("Error al cargar la tabla - Chequear API");
}

function llenarFila(vehiculos) {
  let id = vehiculos.id;
  let marca = vehiculos.marca;
  let modelo = vehiculos.modelo;
  let precio = vehiculos.precio;
  let eliminar = "Eliminar";

  let tabla = document.getElementById("body_id");
  let fila = document.createElement("tr");
  fila.setAttribute("id", vehiculos.id);
  let data1 = document.createElement("td");
  data1.appendChild(document.createTextNode(id));
  fila.appendChild(data1);
  let data2 = document.createElement("td");
  data2.appendChild(document.createTextNode(marca));
  fila.appendChild(data2);
  let data3 = document.createElement("td");
  data3.appendChild(document.createTextNode(modelo));
  fila.appendChild(data3);
  let data4 = document.createElement("td");
  data4.appendChild(document.createTextNode(precio));
  fila.appendChild(data4);
  let data5 = document.createElement("td");
  data5.appendChild(document.createTextNode(eliminar));
  data5.style.background = "#FF3333";
  data5.style.fontWeight = "bold";
  fila.appendChild(data5);
  data5.addEventListener("click", eliminarVehiculo);

  tabla.appendChild(fila);
}

function llenarTabla(elementos) {
  vaciarTabla();
  elementos.forEach((element) => {
    llenarFila(element);
  });
}

function vaciarTabla() {
  let node = document.getElementById("body_id");
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}

function agregarVehiculo() {
  var marca = document.getElementById("marca").value;
  var modelo = document.getElementById("modelo").value;
  var tipo = document.getElementById("tipo").value;
  var precio = document.getElementById("precio").value;

  let id = 0;
  vehiculos.forEach((vehiculo) => {
    if (vehiculo.id > id) {
      id = vehiculo.id;
    }
  });
  if (marca != "" && modelo != "" && tipo != "" && precio != "") {
    if (!parseInt(precio)) {
      alert("Precio debe ser un numero");
    } else {
      if (tipo == "Auto") {
        let vehiculo = new Auto(
          id + 1,
          marca,
          modelo,
          precio,
          0
        );
        vehiculos.push(vehiculo);
      } else {
        let vehiculo2 = new Camioneta(
          id + 1,
          marca,
          modelo,
          precio,
          true
        );
        vehiculos.push(vehiculo2);
      }
      llenarTabla(vehiculos);
      cerrarDiv();
    }

  } else {
    alert("Debe completar todos los campos");
  }
}

function cerrarDiv() {
  var divVehiculos = $("divFormVehiculos");
  divVehiculos.hidden = true;
}

function eliminarVehiculo(event) {
  var fila = event.target.parentNode;
  var id = fila.childNodes[0].childNodes[0].nodeValue;
  var flag = false;

  vehiculos.forEach((element, index) => {
    if (element.id == id) {
      flag = true;
      vehiculos.splice(index, 1);
    }
  });
  if (!flag) {
    alert("No se encontró el id");
  }
  llenarTabla(vehiculos);
}

function hiddenAlta() {
  var divVehiculos = $("divFormVehiculos");
  divVehiculos.hidden = false;
}

function calcularPromedio() {
  var total = 0;
  total = vehiculos.reduce((sum, veh) => sum + parseInt(veh.precio), 0);
  total = total / vehiculos.length;
  document.getElementById("prom").value = total;
}

function filtrarTabla() {
  var tipo_selected = document.getElementById("tipo_filtro").value;
  var vehiculos2 = [];
  if (tipo_selected == "Auto") {
    vehiculos2 = vehiculos.filter((vehiculo) => vehiculo.cantidadDePuertas != null);
  } else {
    vehiculos2 = vehiculos.filter((vehiculo) => vehiculo.cuatroXcuatro != null);
  }
  llenarTabla(vehiculos2);
}

function LimpiarFiltro() {
  llenarTabla(vehiculos);
}

function CambiarEstadoColumna(numero) {
  var columnaID;
  switch (numero) {
    case 0:
      columnaID = document.getElementById("cb_id");
      break;

    case 1:
      columnaID = document.getElementById("cb_nombre");
      break;

    case 2:
      columnaID = document.getElementById("cb_apellido");
      break;

    case 3:
      columnaID = document.getElementById("cb_edad");
      break;
  }
  if (columnaID.checked) {
    stl = "table-cell";
  } else {
    stl = "none";
  }
  var tbl = document.getElementById("tabla");
  var th = tbl.getElementsByTagName("th");
  var rows = tbl.getElementsByTagName("tr");
  th[numero].style.display = stl;
  for (var row = 1; row < rows.length; row++) {
    var cels = rows[row].getElementsByTagName("td");
    cels[numero].style.display = stl;
  }
}
