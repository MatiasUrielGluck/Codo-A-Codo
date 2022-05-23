let slideActual = 0;
mostrarSlide(slideActual)

function cambiarSlide(modificador) {
    // Cambia el índice del slide actual
    mostrarSlide(slideActual + modificador);
}

function mostrarSlide(indice) {
    let slides = document.getElementsByClassName("slide");
    let puntos = document.getElementsByClassName("punto");
    if (indice > slides.length - 1) { indice = 0; }
    else if (indice < 0) { indice = slides.length - 1 }

    slides[slideActual].style.display = "none";
    puntos[slideActual].className = "punto";

    slides[indice].style.display = "block";
    puntos[indice].className += " punto-activo";
    slideActual = indice;
    
}