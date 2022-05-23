var cadenaHtml = ``;

for (var piano of data) {
    cadenaHtml += `
    <div class="instrumento" id=${piano.id}>
        <img src="./imgs/pianos/${piano.imagen}" alt="">
        <div>
            <h1>${piano.marca}</h1>
            <p>$${piano.precio}</p>
            <div class="boton-container">
                <a onclick="agregar(${piano.precio})" style="margin-top: 0;">Agregar al carrito</a>
            </div>
        </div>
    </div>
    `
}

document.getElementById("pianos").innerHTML = cadenaHtml;