function filtrar() {
    for (var piano of data) {
        document.getElementById(piano.id).style.display = "block";
    }

    var cadena = document.forms["formBusqueda"]["barraDeBusqueda"].value;

    for (var piano of data) {
        if (!piano.id.toLowerCase().includes(cadena.toLowerCase())) {
            document.getElementById(piano.id).style.display = "none";
        }
    }

    return false;
}