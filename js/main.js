//constructora
class velas {
  constructor(nombre, precio, imagen, imgAlt) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.imgAlt = imgAlt;
  }
}

//funciones


//instanciacion

const vela1 = new velas("Woolen ball", 150, "imgs/woolen.jpg","imagen vela woolen ball");
const vela2 = new velas("Bubble", 350,"imgs/bubble.jpg", "imagen vela bubble" );
const vela3 = new velas("Mini bubble", 100, "imgs/minibubble.jpg", "imagen vela mini bubble");
const vela4 = new velas("Onion", 180,"imgs/onion.jpg", "imagen vela onion");
const vela5 = new velas("Luna llena", 550,"imgs/lunallena.jpg", "imagen vela luna llena");
const vela6 = new velas("Luna nueva", 450,"imgs/lunanueva.jpg", "imagen vela luna nueva");
const vela7 = new velas("Cuarto creciente", 350,"imgs/cuartocreciente.jpg", "imagen vela cuarto creciente" );
const vela8 = new velas("Cuarto menguante", 300 ,"imgs/cuartomenguante.jpg", "imagen vela cuarto menguante");
const vela9 = new velas("Yue", 200,"imgs/yue.jpg", "imagen vela yue");
const vela10 = new velas("Lúa", 200,"imgs/lua.jpg", "imagen vela lua");
const vela11 = new velas( "Bombones de cera X 5", 100,"imgs/bombones.jpg", "imagen de los bombones de aroma" );
const vela12 = new velas( "Hornito + 5 bombones y 2 velas de encendido", 350,"imgs/hornito.jpg", "imagen hornito y bombones");
const vela13 = new velas( "Flower", 150,"imgs/.jpg", "imagen vela");


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

const aromas = [
  "Limon",
  "Lavanda",
  "Mango",
  "Vainilla",
  "Floral",
  "Jazmin",
  "Naranja",
  "Canela",
];

// captura de nodos


// eventos
grupoVelas.sort((a, b) => b.precio - a.precio);
