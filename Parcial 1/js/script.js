window.addEventListener("load", CargarElementos);

function $(id) {
    return document.getElementById(id);
}


function CargarElementos() {
    var peticion = new XMLHttpRequest();
    peticion.onreadystatechange = function () {

        if (peticion.status == 200 && peticion.readyState == 4) {
            $("divSpinner").hidden = true;
            var personas = JSON.parse(peticion.responseText);

            for (let index = 0; index < personas.length; index++) {
                crearFila(personas[index]);
            }
        }
    }

    peticion.open("GET", "http://localhost:3000/personas", true);
    peticion.send();
    $("divSpinner").hidden = false;
}

function crearFila(persona) {
    var fila = document.createElement("tr");

    var tdId = document.createElement("td");
    var tdNombre = document.createElement("td");
    var tdApellido = document.createElement("td");
    var tdLocalidad = document.createElement("td");
    var tdSexo = document.createElement("td");

    var txtId = document.createTextNode(persona.id);
    var txtNombre = document.createTextNode(persona.nombre);
    var txtApellido = document.createTextNode(persona.apellido);
    var txtLocalidad = document.createTextNode(persona.localidad.nombre);
    var txtSexo = document.createTextNode(persona.sexo);

    fila.appendChild(tdId);
    tdId.appendChild(txtId);

    fila.appendChild(tdNombre);
    tdNombre.appendChild(txtNombre);

    fila.appendChild(tdApellido);
    tdApellido.appendChild(txtApellido);

    fila.appendChild(tdLocalidad);
    tdLocalidad.appendChild(txtLocalidad);

    fila.appendChild(tdSexo);
    tdSexo.appendChild(txtSexo);

    fila.addEventListener("dblclick", desplegarFormFila);

    $("tabla").appendChild(fila);
}

//form hidden

function desplegarFormFila(event) {
    var divPersona = $("divFormPersonas");
    divPersona.hidden = false;

    $("btnEliminar").onclick = function()
    {
        var jsonIdMateria = {"id":id}
    
        var peticion = new XMLHttpRequest();
        peticion.onreadystatechange = function() 
        {                
            if(peticion.status == 200 && peticion.readyState == 4)
            {
                $("divSpinner").hidden=true;
                tabla.removeChild(fila);
            }
        }
        peticion.open("POST","http://localhost:3000/eliminar");
        peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        peticion.send(JSON.stringify(jsonIdMateria));
        $("divSpinner").hidden=false;

        
    }

    $("btnCerrar").onclick = function(){
        $("divFormMateria").hidden = true;
    }
    $("btnCerrar").onclick = function () {
        divPersona.hidden = true;
    }

    $("btnModificar").onclick = function () {
        var nombreInput = $("txtNombre").value;
        var apellidoInput = $("txtApellido").value;
        var localidadInput = $("selectLocalidad").value;
        var sexoInput = fila.childNodes[4].childNodes[0].nodeValue;

        var jsonMateria = { "id": id, "nombre": nombreInput, "apellido": apellidoInput, "sexo": sexoInput, "localidad": { "id": 17, "nombre": localidadInput } };
        
        var peticion = new XMLHttpRequest();
        peticion.onreadystatechange = function () {
            $("divSpinner").hidden = true;
            if($("txtNombre").value.length  < 3 || $("txtApellido").value.length  < 3)
            {  
                $("txtNombre").style.borderColor="red";     
                $("txtApellido").style.borderColor="red";       
    
            }else
            {
                $("txtNombre").style.borderColor="black";   
                $("txtApellido").style.borderColor="black";
                
                if($("femenino").checked)
                {
                    sexoInput = "Female";
                    $("masculino").checked = false;
                }else if($("masculino").checked){ 
                    sexoInput = "Masculino";
                    $("femenino").checked = false;
                }
                
                fila.childNodes[1].childNodes[0].nodeValue = nombreInput;
                fila.childNodes[2].childNodes[0].nodeValue = apellidoInput;
                fila.childNodes[3].childNodes[0].nodeValue = localidadInput;
                fila.childNodes[4].childNodes[0].nodeValue = sexoInput;
            }
        }
    
        peticion.open("POST", "http://localhost:3000/editar");
        peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        peticion.send(JSON.stringify(jsonMateria));
    
        $("divSpinner").hidden = false;
    }

    var tabla = $("tabla");
    var fila = event.target.parentNode;
    var id = fila.childNodes[0].childNodes[0].nodeValue;
    var nombre = fila.childNodes[1].childNodes[0].nodeValue;
    var apellido = fila.childNodes[2].childNodes[0].nodeValue;
    var localidad = fila.childNodes[3].childNodes[0].nodeValue;

    $("txtNombre").value = nombre;
    $("txtApellido").value = apellido;
    $("selectLocalidad").value = localidad;
    
    $("btnEliminar").onclick = function()
    {
        var jsonIdMateria = {"id":id}
    
        var peticion = new XMLHttpRequest();
        peticion.onreadystatechange = function() 
        {                
            if(peticion.status == 200 && peticion.readyState == 4)
            {
                $("divSpinner").hidden=true;
                tabla.removeChild(fila);
            }
        }
        peticion.open("POST","http://localhost:3000/eliminar");
        peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        peticion.send(JSON.stringify(jsonIdMateria));
        $("divSpinner").hidden=false;

        
    }
}