function validar() {
    var nombre = document.forms["formulario"]["nombre"].value;
    var apellido = document.forms["formulario"]["apellido"].value;
    var email = document.forms["formulario"]["email"].value;
    var telefono = document.forms["formulario"]["telefono"].value;
    var producto = document.forms["formulario"]["producto"].value;
    var comentarios = document.forms["formulario"]["comentarios"].value;

    
    if (nombre == "" || apellido == "" || email == "" || comentarios == "") {
        document.getElementById("msgError").style.color = "red";
    }
    else {
        document.getElementById("msgError").style.color = "#ffffff";
        alert("Se envió el formulario correctamente.");
    }

    return false;
}