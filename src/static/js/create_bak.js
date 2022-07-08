function guardar() {
 
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
    fetch(url, options)
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

    let urlImage = "http://localhost:5000/upload"
    var options = {
    method: 'POST'
    // redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Imagen grabada")
            
            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar imagen" )
            console.error(err);
        })
}
