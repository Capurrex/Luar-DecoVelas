//constructora
class velas {
  constructor(id,nombre, precio, imagen, imgAlt, descripcion) {
    this.id = id,
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.imgAlt = imgAlt;
    this.descripcion=descripcion;
  }
}

/*let catalogo = []
if(localStorage.getItem("catalogo")){
  catalogo = JSON.parse(localStorage.getItem("catalogo"))
}*/

//capturas nodos 
let verCatalogo = document.getElementById("verCatalogo")
let match = document.getElementById("match")
let chartModal = document.getElementById("chartModal")

//funciones

function mostrarCatalogo(arrVela,arrAroma,arrColor){
  verCatalogo.innerHTML = ""
  for(let vela of arrVela){
      let nuevaVela = document.createElement("div")
      nuevaVela.classList.add ("col-xl-2","col-md-3", "col-6","row")
      nuevaVela.innerHTML = ` <div id="v${vela.id}" class="card row">
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
                id="selectAroma"
                class="form-select form-select-sm"
                aria-label=".form-select-sm example">
                  <option selected>Elije el aroma</option>
              </select>
            </ul>
            <ul class="mitad">
              <select
                id="selectColor"
                class="form-select form-select-sm"
                aria-label=".form-select-sm example">
                  <option selected>Elije el color</option>
              </select>
            </ul>
          </div>
        </div>
    </div>`
    

// <option value="1">poner colores</option>

     verCatalogo.appendChild(nuevaVela)

     let botonCarrito = document.getElementById(`carritov${vela.id}`)
         
        botonCarrito.addEventListener("click", ()=>{addChart(vela)})


  }}


function addChart (vela) {
  chartItems.push(vela)
  localStorage.setItem("chart", JSON.stringify(chartItems))
}

function showChart(array){

  for(let item of array){
      let newItem = document.createElement("div")

      newItem.innerHTML = `<div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${item.imagen}" class="img-fluid rounded-start imgSizeAdjust" alt="${item.imgAlt}">
        </div>
        <div class="col-md-8 text-center hstack">
          <div class="card-body align-evenly">
            <h5 class="card-title">${item.nombre}</h5>
            <p class="card-text">${item.descripcion} <br> Color:$colo{}  Aroma:$aroma{}  Precio: $ ${item.precio  } </p>
            <a id="removeCh${item.id}" class="btn btn-danger">Eliminar</a>
          </div>
        </div>
      </div>
    </div>`
     chartModal.appendChild(newItem)
    }}

//instanciacion

const vela1 = new velas("1","Woolen ball", 150, "imgs/woolen.jpg","imagen vela woolen ball", "pedir la descripcion");
const vela2 = new velas("2","Bubble", 350,"imgs/bubble.jpg", "imagen vela bubble", "pedir la descripcion" );
const vela3 = new velas("3","Mini bubble", 100, "imgs/minibubble.jpg", "imagen vela mini bubble", "pedir la descripcion");
const vela4 = new velas("4","Onion", 180,"imgs/onion.jpg", "imagen vela onion", "pedir la descripcion");
const vela5 = new velas("5","Luna llena", 550,"imgs/lunallena.jpg", "imagen vela luna llena", "pedir la descripcion");
const vela6 = new velas("6","Luna nueva", 450,"imgs/lunanueva.jpg", "imagen vela luna nueva", "pedir la descripcion");
const vela7 = new velas("7","Cuarto creciente", 350,"imgs/cuartocreciente.jpg", "imagen vela cuarto creciente", "pedir la descripcion" );
const vela8 = new velas("8","Cuarto menguante", 300 ,"imgs/cuartomenguante.jpg", "imagen vela cuarto menguante", "pedir la descripcion");
const vela9 = new velas("9","Yue", 200,"imgs/yue.jpg", "imagen vela yue", "pedir la descripcion");
const vela10 = new velas("10","Lúa", 200,"imgs/lua.jpg", "imagen vela lua", "pedir la descripcion");
const vela11 = new velas( "11","Bombones de cera X 5", 100,"imgs/bombones.jpg", "imagen de los bombones de aroma", "pedir la descripcion" );
const vela12 = new velas("12", "Hornito + 5 bombones y 2 velas de encendido", 350,"imgs/hornito.jpg", "imagen hornito y bombones", "pedir la descripcion");
const vela13 = new velas("13", "Flower", 150,"imgs/flower.jpg", "imagen vela", "pedir la descripcion");


const grupoVelas = [
  vela1,
  vela2,
  vela3,
  vela4,
  vela5,
  vela6,
  vela7,
  vela8,
  vela9,
  vela10,
  vela11,
  vela12,
  vela13,
];

const aromasVelas = [
  "Limon",
  "Lavanda",
  "Mango",
  "Vainilla",
  "Floral",
  "Jazmin",
  "Naranja",
  "Canela",
];

const coloresVelas= [
  "rosa", "verde", "azul", "naranja", "amarillo", "gris", "beige", "blanco", "violeta"]


let chartItems = JSON.parse(localStorage.getItem("chart")) || []

// eventos

mostrarCatalogo(grupoVelas)

showChart(chartItems)