class Persona {
    constructor(p_nombre, p_apellido) {
        this.nombre = p_nombre;
        this.apellido = p_apellido;
    }

}

class Cliente extends Persona {

    constructor(id, nombre, apellido, edad, sexo) {
        super(nombre, apellido);
        this.id = id;
        this.edad = edad;
        this.sexo = sexo;
    }
}

class Logica {

    static crearFila(cliente) {
        var fila = document.createElement("tr");

        var tdId = document.createElement("td");
        var tdNombre = document.createElement("td");
        var tdCuatrimestre = document.createElement("td");
        var tdFechaFinal = document.createElement("td");
        var tdTurno = document.createElement("td");

        var txtId = document.createTextNode(cliente.id);
        var txtNombre = document.createTextNode(cliente.nombre);
        var txtCuatrimestre = document.createTextNode(cliente.apellido);
        var txtFechaFinal = document.createTextNode(cliente.edad);
        var txtTurno = document.createTextNode(cliente.sexo);

        fila.appendChild(tdId);
        tdId.appendChild(txtId);

        fila.appendChild(tdNombre);
        tdNombre.appendChild(txtNombre);

        fila.appendChild(tdCuatrimestre);
        tdCuatrimestre.appendChild(txtCuatrimestre);

        fila.appendChild(tdFechaFinal);
        tdFechaFinal.appendChild(txtFechaFinal);

        fila.appendChild(tdTurno);
        tdTurno.appendChild(txtTurno);

        fila.addEventListener("click", this.desplegarFormFila);

        $("tabla").appendChild(fila);
    }
    
    static desplegarFormFila(event) {

        var fila = event.target.parentNode;
        var id = fila.childNodes[0].childNodes[0].nodeValue;
        var nombre = fila.childNodes[1].childNodes[0].nodeValue;
        var apellido = fila.childNodes[2].childNodes[0].nodeValue;
        var edad = fila.childNodes[3].childNodes[0].nodeValue;
        var sexo = fila.childNodes[3].childNodes[0].nodeValue;


        $("inputID").value = id;
        $("inputNombre").value = nombre;
        $("inputApellido").value = apellido;
        $("inputEdad").value = edad;
        $("selectSexo").value = sexo;

        $("btnEliminar").onclick = function () {

            if ($("inputID").value == id) {
                tabla.removeChild(fila);
            }
        }
        
    }


}

window.addEventListener("load", CargarElementos);

function $(id) {
    return document.getElementById(id);
}
function CargarElementos() {
    var peticion = new XMLHttpRequest();
    peticion.onreadystatechange = function () {
        if (peticion.status == 200 && peticion.readyState == 4) {
            var clientes = JSON.parse(peticion.responseText);

            for (let index = 0; index < clientes.length; index++) {
                let cliente = new Cliente(clientes[index].id, clientes[index].nombre, clientes[index].apellido, clientes[index].edad, clientes[index].sexo);
                Logica.crearFila(cliente);
            }
        }
    }
    peticion.open("GET", "http://localhost:3001/clientes", true);
    peticion.send();

}





