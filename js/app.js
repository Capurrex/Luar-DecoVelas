//instanciacion

let grupoVelas = [];

let chartItems = JSON.parse(localStorage.getItem("chart")) || [];

// eventos

Catalogo();

botonModal.addEventListener("click", () => showChart(chartItems));

vaciarCarrito.addEventListener("click", () => carritoVacio())

inputBuscador.addEventListener("input", ()=>{
  buscarVela(inputBuscador.value.toLowerCase(),grupoVelas )
  console.log(inputBuscador.value)
}) 

botonComprar.addEventListener( "click", ()=>{
  finalizarCompra()
})