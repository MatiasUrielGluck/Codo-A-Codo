var compraTotal = 0;
mostrarCompraTotal();

function agregar(precio) {
    compraTotal += precio;
    mostrarCompraTotal();
}

function mostrarCompraTotal() {
    document.getElementById("carrito").innerHTML = `<h3>Carrito: $${compraTotal}</h3>`;
}