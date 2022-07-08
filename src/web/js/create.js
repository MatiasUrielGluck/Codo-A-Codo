const inputArchivo = document.querySelector("#imagen");
const imagen = document.querySelector("#txtImagen")

inputArchivo.addEventListener("change", () => {
    imagen.value = inputArchivo.files[0].name;
})

async function guardar() {
 
    let m = document.getElementById("txtModelo").value
    let i = document.getElementById("txtImagen").value
    let p = parseFloat(document.getElementById("txtPrecio").value)
 
    let producto = {
        modelo: m,
        imagen: i,
        precio: p
    }

    console.log(producto)

    let url = "http://localhost:5000/pianos"
    var options = {
        body: JSON.stringify(producto),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       // redirect: 'follow'
    }
    await fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Grabado")
 
            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
    
    var data = new FormData()
    data.append('imagen', document.querySelector("#imagen").files[0])
    data.append('imagen', document.querySelector("#imagen").files[0].name)

    fetch('http://localhost:5000/upload_image', { method:'POST', body: data} )
    .then(() => {
        console.log('Imagen guardada correctamente');
        alert('Imagen cargada correctamente');
    })
    .catch(err => {
        alert("Error al cargar la imagen");
        console.error(err)
    })
    // await document.getElementById('newPianoForm').submit();
}
