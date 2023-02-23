//instanciacion

let grupoVelas = [];

let chartItems = JSON.parse(localStorage.getItem("chart")) || [];

// eventos

Catalogo();

botonModal.addEventListener("click", () => showChart(chartItems));

vaciarCarrito.addEventListener("click", () => carritoVacio())

// buscador.addEventListener("input", ()=>{
//   buscarInfo(buscador.value.toLowerCase(), estanteria)
// }) 