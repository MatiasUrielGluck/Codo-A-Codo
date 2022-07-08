document.getElementById("footer").innerHTML = `
        <p>&copy;Copyright 2022 - Todos los derechos reservados. <a onclick="disclaimer()">Disclaimer</a></p>
        <p></p>
        <div>
            <a href="https://www.youtube.com/channel/UCKbXB3qWadl9qUKiBF6i8Gw" target="_blank"><i class="fa-brands fa-youtube fa-2xl" style="color: red;"></i></a>
            <a href="https://www.facebook.com/matias.gluck.9" target="_blank"><i class="fa-brands fa-facebook-square fa-2xl" style="color: blue;"></i></a>
            <a href="https://www.instagram.com/matias_uriel_gluck/" target="_blank"><i class="fa-brands fa-instagram-square fa-2xl" style="color: rosybrown;"></i></a>
        </div>
`;

function disclaimer() {
    alert("Toda la información aquí mostrada ha sido inventada con el único fin de presentar esta página como Trabajo Práctico. Las direcciones, modelos, precios, descripciones, fotos, etc, son extraídas de internet o inventadas. Creador de la página: Matías Gluck, matiasugluck@gmail.com");
}