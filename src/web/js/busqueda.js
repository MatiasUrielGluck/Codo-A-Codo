function filtrar() {
    for (var piano of pianos) {
        document.getElementById(piano.id).style.display = "block";
    }

    var cadena = document.forms["formBusqueda"]["barraDeBusqueda"].value;

    for (var piano of pianos) {
        if (!piano.modelo.toLowerCase().includes(cadena.toLowerCase())) {
            document.getElementById(piano.id).style.display = "none";
        }
    }

    return false;
}