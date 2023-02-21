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
let botonModal = document.getElementById("botonModal")
//funciones

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

function mostrarCatalogo(arrVela) {
  verCatalogo.innerHTML = "";
  for (let vela of arrVela) {
    let nuevaVela = document.createElement("div");
    nuevaVela.classList.add("col-xl-3", "col-md-4", "col-6", "row");
    nuevaVela.innerHTML = ` <div id="${vela.id}" class="card row ">
        <img src="${vela.imagen}" class="card-img-top" alt="${vela.imgAlt}" />
        <div class="card-body">
          <h5 class="card-title">${vela.nombre}</h5>
          <p class="card-text">
            ${vela.descripcion}. Precio: $ ${vela.precio}
          </p>
          <a  id ="carritov${vela.id}" class="btn">Agregar al carrito</a>
          <div class="row">
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

function addChart(vela, selectAroma, selectColor ) {
  let cargandoAlCarrito = chartItems.find((item) => item.id == vela.id && item.color.trim() == selectColor.value.trim() && item.aroma.trim() == selectAroma.value.trim());

  console.log(cargandoAlCarrito)
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
  }
  
  else {
    cargandoAlCarrito.cantidad += 1;
    localStorage.setItem("chart", JSON.stringify(chartItems))
    }
}


function showChart(array) {
  for (let item of array) {
    let newItem = document.createElement("div");

    newItem.innerHTML = `<div class="card mb-3" style="max-width: 540px;">
      <div class="d-flex align-items-center">
        <div class="col-4">
          <img src="${item.imagen}" class="img-fluid rounded-start imgSizeAdjust" alt="${item.imgAlt}">
        </div>
        <div class="col-md-8 text-center hstack">
          <div class="card-body align-evenly">
            <h5 class="card-title">${item.nombre}</h5>
            <p class="card-text">${item.descripcion} <br> Color:${item.color}  Aroma:${item.aroma}  <br>Cantidad: ${item.cantidad} Precio: $ ${item.precio}*${item.cantidad}</p>
            <a id="remove${item.idChart}" class="btn btn-danger">Eliminar</a>
          </div>
        </div>
      </div>
    </div>`;
    chartModal.appendChild(newItem);
  }


}


//instanciacion

let grupoVelas = [];

let chartItems = JSON.parse(localStorage.getItem("chart")) || [];

// eventos

Catalogo();

showChart(chartItems);



