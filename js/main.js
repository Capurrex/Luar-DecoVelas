

//capturas nodos
let verCatalogo = document.getElementById("verCatalogo");
let match = document.getElementById("match");
let chartModal = document.getElementById("chartModal");
let botonModal = document.getElementById("botonModal");
let precioTotal = document.getElementById("precioTotal");
let vaciarCarrito = document.getElementById("vaciarCarrito")



//funciones

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

//mostrar catalogo
function mostrarCatalogo(arrVela) {
  verCatalogo.innerHTML = "";
  for (let vela of arrVela) {
    let nuevaVela = document.createElement("div");
    nuevaVela.classList.add("col-xl-3", "col-md-4", "col-sm-6","col-10","offset-1","offset-sm-0", "row");
    nuevaVela.innerHTML = ` <div id="${vela.id}" class="card row ">
        <img src="${vela.imagen}" class="card-img-top" alt="${vela.imgAlt}" />
        <div class="card-body">
          <h5 class="card-title">${vela.nombre}</h5>
          <p class="card-text">
            ${vela.descripcion}. Precio: $ ${vela.precio}
          </p>
          <div class="row ">
            <ul class="mitad">
              <select
                id="aroma${vela.id}"
                class="form-select form-select-sm"
                aria-label=".form-select-sm example">
                  <option selected>Elije el aroma</option>
                  <option value="Limón">Limón</option>
                  <option value="Lavanda">Lavanda</option>
                  <option value="Mango">Mango</option>
                  <option value="Vainilla">Vainilla</option>
                  <option value="Floral">Floral</option>
                  <option value="Jazmin">Jazmin</option>
                  <option value="Naranja">Naranja</option>
                  <option value="Canela">Canela</option>
              </select>
            </ul>
            <ul class="mitad">
              <select
                id="color${vela.id}"
                class="form-select form-select-sm"
                aria-label=".form-select-sm example">
                  <option selected>Elije el color</option>
                  <option value="Rosa">Rosa</option>
                  <option value="Verde">Verde</option>
                  <option value="Azul">Azul</option>
                  <option value="Amarillo">Amarillo</option>
                  <option value="Gris">Gris</option>
                  <option value="Beige">Beige</option>
                  <option value="Naranja">Naranja</option>
                  <option value="Blanco">Blanco</option>
                  <option value="Violeta">Violeta</option>
              </select>
            </ul>
            <a  id ="carritov${vela.id}" class="btn btn-success">Agregar al carrito</a>
          </div>
        </div>
    </div>`;

    verCatalogo.appendChild(nuevaVela);

    let selectAroma = document.getElementById(`aroma${vela.id}`);
    let selectColor = document.getElementById(`color${vela.id}`);
    let botonCarrito = document.getElementById(`carritov${vela.id}`);

    botonCarrito.addEventListener("click", () => {
      addChart(vela, selectAroma, selectColor);
    });
  }
}
 
// añadir al carro
function addChart(vela, selectAroma, selectColor ) {
  let cargandoAlCarrito = chartItems.find((item) => item.id == vela.id && item.color.trim() == selectColor.value.trim() && item.aroma.trim() == selectAroma.value.trim());

  if(selectAroma.value === "Elije el aroma" || selectColor.value === "Elije el color")
   {swal.fire({
    icon : `info`,
    text : `Debes elegir color y aroma para agregar al carrito`});}
  
  else if(cargandoAlCarrito == undefined){
    let nuevaVela = new velas(vela.id, vela.nombre, vela.precio, vela.imagen, vela.imgAlt, vela.descripcion);
    nuevaVela.color = selectColor.value;
    nuevaVela.aroma = selectAroma.value;
    nuevaVela.idChart = vela.id+nuevaVela.color+nuevaVela.aroma;
    chartItems.push(nuevaVela);
    localStorage.setItem("chart", JSON.stringify(chartItems));
    swal.fire({
      icon : `success`,
      text : `el producto fue agregado al carrito`,
      showCloseButton : true,
      showConfirmButton: false,
      timer: 800
    });
  }
  
  else {
    cargandoAlCarrito.cantidad += 1;
    localStorage.setItem("chart", JSON.stringify(chartItems))
    swal.fire({
      icon : `success`,
      text : `Has agregado una unidad mas al carrito`,
      showCloseButton : true,
      showConfirmButton: false,
      timer: 800
    });
    }
}
//sumar valor del carrito
function chartTotal(array){
  let total = array.reduce((acc, velaCarrito)=> acc + (velaCarrito.precio*velaCarrito.cantidad) ,0)
  total == 0 ? precioTotal.innerHTML =  `El carrito esta vacio` : precioTotal.innerHTML = `El total de su compra es $ ${total}`
  return total
}
// mostrar carrito y eliminar agregar en el carrito
function showChart(array) {
    chartModal.innerHTML = ""
    array.forEach((item) => {
      chartModal.innerHTML += `<div id="Card${item.idChart}" class="card mb-3" style="max-width: 540px;">
      <div class="d-flex align-items-center">
        <div class="col-4">
          <img src="${item.imagen}" class="img-fluid rounded-start imgSizeAdjust" alt="${item.imgAlt}">
        </div>
        <div class="col-md-8 text-center hstack">
          <div class="card-body align-evenly">
            <h5 class="card-title">${item.nombre}</h5>
            <p class="card-text">${item.descripcion} <br> Color:${item.color}  Aroma:${item.aroma}  <br>Cantidad: ${item.cantidad} Precio: $ ${item.precio*item.cantidad}</p>
            <div>
            <a id="remove1${item.idChart}" class="btn btn-danger">-1</a>
            <a id="remove${item.idChart}" class="btn btn-danger">Eliminar</a>
            <a id="add1${item.idChart}" class="btn btn-success">+1</a>
            </div>
          </div>
        </div>
      </div>
    </div>`
    });

    // boton eliminar individual
    array.forEach((item)=> {
      document.getElementById(`remove${item.idChart}`).addEventListener("click", ()=>{
          let velaChart = document.getElementById(`Card${item.idChart}`)
          velaChart.remove()

          let chartErase = array.find((vela)=>vela.idChart == item.idChart)

          let posicion = array.indexOf(chartErase)
          array.splice(posicion,1)
          localStorage.setItem("chart", JSON.stringify(array))
          
          
          chartTotal(array)
      })})

      //sumar 1
      array.forEach((item)=> {
      document.getElementById(`add1${item.idChart}`).addEventListener(
        "click", () => {
          item.cantidad = item.cantidad +1
          localStorage.setItem("chart", JSON.stringify(array))
          showChart(array)
        })}
      )
      //restar 1
      array.forEach((item) => {
       document.getElementById(`remove1${item.idChart}`).addEventListener("click", () =>{ 
        item.cantidad = item.cantidad -1
        if(item.cantidad <= 1) {item.cantidad = 1}
        localStorage.setItem("chart", JSON.stringify(array))
        showChart(array)
      })})

    chartTotal(array)
}

function carritoVacio(){
  chartItems = []
  localStorage.removeItem("chart")
  showChart(chartItems)
  chartTotal()
}

function buscarInfo(buscado, array){
  let busquedaArray = array.filter(
      (libro) => libro.autor.toLowerCase().includes(buscado.toLowerCase()) || libro.titulo.toLowerCase().includes(buscado.toLowerCase())
  ) }


