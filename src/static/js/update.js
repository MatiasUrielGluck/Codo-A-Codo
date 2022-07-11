const inputArchivo = document.querySelector("#imagen");
const imagen = document.querySelector("#txtImagen")

inputArchivo.addEventListener("change", () => {
    imagen.value = inputArchivo.files[0].name;
})

var args = location.search.substr(1).split('&');
// lee los argumentos pasados a este formulario
var parts = []
for (let i = 0; i < args.length; ++i) {
    parts[i] = args[i].split('=');
}
console.log(args)
document.getElementById("txtId").value = parts[0][1]
document.getElementById("txtModelo").value = parts[1][1]
document.getElementById("txtImagen").value = parts[2][1]
document.getElementById("txtPrecio").value = parts[3][1]
 
async function modificar() {
    let id = document.getElementById("txtId").value
    let m = document.getElementById("txtModelo").value
    let i = document.getElementById("txtImagen").value
    let p = parseFloat(document.getElementById("txtPrecio").value)
    let piano = {
        modelo: m,
        imagen: i,
        precio: p
    }
    let url = "https://gluck-pianos.herokuapp.com/pianos/"+id
    var options = {
        body: JSON.stringify(piano),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    }
    await fetch(url, options)
        .then(function () {
            console.log("modificado")
            alert("Registro modificado")
            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            console.error(err);
            alert("Error al Modificar")
        })  
        
    var data = new FormData()
    data.append('imagen', document.querySelector("#imagen").files[0])
    data.append('imagen', document.querySelector("#imagen").files[0].name)

    fetch('https://gluck-pianos.herokuapp.com/upload_image', { method:'POST', body: data} )
    .then(() => {
        console.log('Imagen guardada correctamente');
        alert('Imagen cargada correctamente');
    })
    .catch(err => {
        alert("Error al cargar la imagen");
        console.error(err)
    })
}
