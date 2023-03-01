//constructora
class velas {
    constructor(id, nombre, precio, imagen, imgAlt, descripcion) {
      (this.id = id), (this.nombre = nombre);
      this.precio = precio;
      this.imagen = imagen;
      this.imgAlt = imgAlt;
      this.descripcion = descripcion;
      this.color = undefined
      this.aroma = undefined
      this.cantidad = 1
    }
  }

  //capturas nodos
let verCatalogo = document.getElementById("verCatalogo");
let match = document.getElementById("match");
let chartModal = document.getElementById("chartModal");
let botonModal = document.getElementById("botonModal");
let precioTotal = document.getElementById("precioTotal");
let vaciarCarrito = document.getElementById("vaciarCarrito")
let inputBuscador = document.getElementById("inputBuscador")
let botonComprar = document.getElementById("botonComprar")



//cargar catalogo
const Catalogo = async () => {
  const response = await fetch("velas.json");
  const data = await response.json();
  for (let candle of data) {
    let newCandle = new velas(
      candle.id,
      candle.nombre,
      candle.precio,
      candle.imagen,
      candle.imagenAlt,
      candle.descripcion
    );
    grupoVelas.push(newCandle);
  }
  mostrarCatalogo(grupoVelas);
};

//sumar valor del carrito
function chartTotal(array){
  let total = array.reduce((acc, velaCarrito)=> acc + (velaCarrito.precio*velaCarrito.cantidad) ,0)
  total == 0 ? precioTotal.innerHTML =  `El carrito esta vacio` : precioTotal.innerHTML = `El total de su compra es $ ${total}`
  return total
}

//vaciar carrito
function carritoVacio(){
  chartItems = []
  localStorage.removeItem("chart")
  showChart(chartItems)
  chartTotal(chartItems)
}

//buscador 
function buscarVela(buscado, array){
  let busqueda = array.filter(
      (velamen) => velamen.nombre.toLowerCase().includes(buscado.toLowerCase()) 
  )
  busqueda.length == 0 ? 
  (match.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`, 
  mostrarCatalogo(busqueda)) 
  : 
  (match.innerHTML = "", 
  mostrarCatalogo(busqueda))
}