let pianos = [];
let loading = true;
let errored = false;

fetch("https://gluck-pianos.herokuapp.com/pianos")
.then(response => response.json())
.then(data => {
    pianos = data;
    loading = false;

    var cadenaHtml = ``;

    for (var piano of pianos) {
        cadenaHtml += `
        <div class="instrumento" id=${piano.id}>
            <img src="../static/imgs/pianos/${piano.imagen}" alt="">
            <div>
                <h1>${piano.modelo}</h1>
                <p>$${piano.precio}</p>
                <div class="boton-container">
                    <a onclick="agregar(${piano.precio})" style="margin-top: 0;">Agregar al carrito</a>
                </div>
            </div>
        </div>
        `
    }

    document.getElementById("pianos").innerHTML = cadenaHtml;
})
.catch(err => {
    errored = true;
})