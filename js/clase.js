
//class constructora
class Libro {
    constructor(id, autor, titulo, precio, imagen){
        //propiedades o atributos de nuestra clase
        this.id = id,
        this.autor = autor,
        this.titulo = titulo,
        this.precio = precio,
        this.imagen = imagen

    }
    //métodos
    mostrarInfoLibro(){
        console.log(`El titulo es ${this.titulo}, el autor es ${this.autor} y su precio es ${this.precio}`)
    }
}
let estanteria = []

const cargarEstanteria = async ()=>{
    //con el async puedo incluir el await
    //ruta relativa es: la del HTML al JSON y abrir con liveServer
    const response = await fetch("libros.json")
    const data = await response.json()
    console.log(data)
    for(let libro of data){
        let libroNuevo = new Libro(libro.id, libro.autor, libro.titulo, libro.precio, libro.imagen)
        estanteria.push(libroNuevo)
    }
    //dentro de la function async seteamos el storage ahí anda perfecto
    localStorage.setItem("estanteria", JSON.stringify(estanteria))
}



if(localStorage.getItem("estanteria")){
    estanteria = JSON.parse(localStorage.getItem("estanteria"))
}else{
    //entra por primera vez
    console.log("Seteando stock de libros")
    //en vez de pushear, para utilizar el .json invoco la function aca
    cargarEstanteria()
    
}

console.log(estanteria)





main.js
//PROYECTO:

//Capturas nodos DOM:
let libros = document.getElementById("libros")
let guardarLibroBtn = document.getElementById("guardarLibroBtn")

let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")

let botonCarrito = document.getElementById("botonCarrito")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")

let precioTotal = document.getElementById("precioTotal")
let fecha = document.getElementById("fecha")
let loaderTexto = document.getElementById("loaderTexto")
let loader = document.getElementById("loader")
let reloj = document.getElementById("reloj")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")

//tercer librería Luxon para fechas y hora
const DateTime = luxon.DateTime

const fechaHoy = DateTime.now()
let fechaMostrar = fechaHoy.toLocaleString(DateTime.DATE_FULL)
fecha.innerHTML = `${fechaMostrar}`

//FUNCTIONS PROYECTO:
function mostrarCatalogo(array){
    libros.innerHTML = ""
    for(let libro of array){
        
        let nuevoLibro = document.createElement("div")
        //classList + add agrego clases al elemento que seleccione
        nuevoLibro.classList.add("col-12", "col-md-6", "col-lg-4", "my-3")
        nuevoLibro.innerHTML = `
        <div id="${libro.id}" class="card" style="width: 18rem;">
                <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${libro.imagen}" alt="${libro.titulo} de ${libro.autor}">
                <div class="card-body">
                            <h4 class="card-title">${libro.titulo}</h4>
                            <p>Autor: ${libro.autor}</p>
                            <p class="${libro.precio <= 2000 && "ofertaLibro"}">Precio: ${libro.precio}</p>
                        <button id="agregarBtn${libro.id}" class="btn btn-outline-success">Agregar al carrito</button>
                </div>
        </div>`
        libros.appendChild(nuevoLibro)

        let btnAgregar = document.getElementById(`agregarBtn${libro.id}`)
        // console.log(btnAgregar)
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(libro)
            
        })
    }
}

//array de productosComprados
// let productosEnCarrito 
// if(localStorage.getItem("carrito")){
//     productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
// }else{
//     productosEnCarrito = []
// }

let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []

function agregarAlCarrito(libro){
    // console.log(libro)
    let libroAgregado = productosEnCarrito.find((elem)=> elem.id == libro.id)
    
    if(libroAgregado == undefined){
        //nivel lógica del array
        console.log(`El libro ${libro.titulo} de ${libro.autor} ha sido agregado. Vale ${libro.precio}`)
        productosEnCarrito.push(libro)
        console.log(productosEnCarrito)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        // cargarProductosCarrito(productosEnCarrito)
        //sweet alert
        Swal.fire({
            title: "Ha agregado un producto :D",
            text: `El libro ${libro.titulo} de ${libro.autor} ha sido agregado`,
            icon: "info",
            confirmButtonText: 'Entendido',
            confirmButtonColor: "green",
            //duración en mili segundos del alert
            timer: 3000,
            imageUrl: `assets/${libro.imagen}`,
            imageHeight: 200
        })

    }else{
        console.log(`EL libro ${libroAgregado.titulo} ya existe en el carrito`)
        Swal.fire({
            title: `Producto ya existente`,
            text: `EL libro ${libroAgregado.titulo} de ${libroAgregado.autor} ya existe en el carrito`,
            icon: "info",
            timer: 2000,
            // confirmButton: false
        })
    }
}



function buscarInfo(buscado, array){
    //método filter
    //si quiero que la búsqueda sea por coincidencia estricta ej:
    // (libro) => libro.autor.toLowerCase() == buscado.toLowerCase() || libro.titulo.toLowerCase() == buscado.toLowerCase()
    let busquedaArray = array.filter(
        (libro) => libro.autor.toLowerCase().includes(buscado.toLowerCase()) || libro.titulo.toLowerCase().includes(buscado.toLowerCase())
    ) 
    

    //equivalente con ternario
    busquedaArray.length == 0 ? 
    (coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`, 
    mostrarCatalogo(busquedaArray)) 
    : 
    (coincidencia.innerHTML = "", 
    mostrarCatalogo(busquedaArray))

}



//agregar al modal carrito
function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoEnCarrito) => {

        modalBodyCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoEnCarrito.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="300px" src="assets/${productoEnCarrito.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${productoEnCarrito.titulo}</h4>
                    
                         <p class="card-text">$${productoEnCarrito.precio}</p> 
                         <button class= "btn btn-danger" id="botonEliminar${productoEnCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
        `
        
    })

    array.forEach((productoEnCarrito)=> {
        //primero debemos capturar
        document.getElementById(`botonEliminar${productoEnCarrito.id}`).addEventListener("click", ()=>{
            //elimnar del DOM
            let cardProducto = document.getElementById(`productoCarrito${productoEnCarrito.id}`)
            cardProducto.remove()
            //eliminar del array de compras
            
            //hago un find para buscar en el array el objeto a eliminar
            let productoEliminar = array.find((libro)=>libro.id == productoEnCarrito.id)
            console.log(productoEliminar)
            //indexOf para saber el indice en el array
            let posicion = array.indexOf(productoEliminar)
            console.log(posicion)
            array.splice(posicion,1)
            console.log(array)
            //eliminar el storage
            localStorage.setItem("carrito", JSON.stringify(array))
            //recalcular el total
            calcularTotal(array)
        })

    })

    calcularTotal(array)
}
function calcularTotal(array){
    let total = array.reduce((acc, productoCarrito)=> acc + productoCarrito.precio ,0)
    // console.log("Con reduce " +total)

    // let acumulador = 0
    // for(let libro of array){
    //     acumulador = acumulador + libro.precio
    // }
    // console.log("Con for of " + acumulador)
    //condicion ? true : false
    total == 0 ? precioTotal.innerHTML = `No hay productos en el carrito` :
    precioTotal.innerHTML = `El total del carrito es <strong>${total}</strong>`

}
function finalizarCompra(){
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
                title: 'Compra realizada',
                icon: 'success',
                confirmButtonColor: 'green',
                text: `Muchas gracias por su compra ha adquirido nuestros productos. `,
                })
                //resetear carrito
                productosEnCarrito = []
                //removemos storage
                localStorage.removeItem("carrito")
        }else{
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `La compra no ha sido realizada! Atención sus productos siguen en el carrito :D`,
                confirmButtonColor: 'green',
                timer:3500
            })
        }
    }

    )
}
//EVENTOS:

guardarLibroBtn.addEventListener("click", ()=>{
    cargarLibro(estanteria)
})

buscador.addEventListener("input", ()=>{
    buscarInfo(buscador.value.toLowerCase(), estanteria)
}) 

selectOrden.addEventListener("change", ()=>{
    console.log(selectOrden.value)
    if(selectOrden.value == 1){
        ordenarMayorMenor(estanteria)
    }else if(selectOrden.value == 2){
        ordenarMenorMayor(estanteria)
    }else if(selectOrden.value == 3){
        ordenarAlfabeticamenteTitulo(estanteria)
    }else{
        mostrarCatalogo(estanteria)
    }
})
botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})
botonFinalizarCompra.addEventListener("click", ()=>{
    finalizarCompra()})


//CODIGO: 
setTimeout(()=>{
    //manipulación de DOM para darle pequeño efecto de carga
    loaderTexto.innerHTML = ""
    loader.remove()
    mostrarCatalogo(estanteria)
}, 3000)

//reloj para el DOM
setInterval(()=>{
    let horaActual = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS)
    reloj.innerHTML = `${horaActual}`
},1000)


functionsSegundaPre.js
//FUNCTIONS SEGUNDA PRE ENTREGA:
//FUNCTIONS proyecto:
function agregarLibro(){
    let autorIngresado = prompt("Ingrese el nombre del autor")
    let tituloIngresado = prompt("Ingrese el titulo del libro")
    let precioIngresado = parseInt(prompt("Ingrese el precio del libro"))
    //creamos nuevo objeto 
    //para id dinámica usamos propiedad length
    const libroNuevo = new Libro(estanteria.length+1, autorIngresado, tituloIngresado, precioIngresado)
    console.log(libroNuevo)
    //sumarlo a estanteria
    estanteria.push(libroNuevo) 
    console.log(estanteria)
}

function eliminarLibro(array){
    console.log("A partir del catalogo ingrese el id que desea eliminar")
    for(let elem of array){
        console.log(`${elem.id} - ${elem.titulo} del autor ${elem.autor}`)
    }
    let idEliminar = parseInt(prompt("Ingrese el id a eliminar"))

    //vamos a hacer una copia del array que tenga sólo las id
    let arrayID = array.map((libro) => libro.id)
    console.log(arrayID)
    //indexOf le pasamos un parametro y de existir nos dice el INDICE donde se encuentra ese parámetro
    //si no lo encuentra devuelve -1
    let indice = arrayID.indexOf(idEliminar)

    //necesitamos un método donde indicar el indice y que nos permita eliminar un elemento SPLICE
    //primer parametro posición donde empieza a trabajar
    //segundo parametro cuantos elementos elimina
    array.splice(indice, 1)
    verCatalogo(array)
}




//aplicación de find
function buscarPorTitulo(array){
    let tituloBuscado = prompt("Ingrese el nombre del titulo del libro que desea buscar")
    let tituloEncontrado = array.find(
        (book)=> book.titulo.toLowerCase() == tituloBuscado.toLowerCase()
        )
    //si hay coincidencia nos devuelve el objeto, sino undefined (Atención find busca y cuando hay coincidencia retorna y deja de buscar)
    if(tituloEncontrado == undefined){
        console.log(`El libro ${tituloBuscado} no está en stock`)
    }
    else{
        console.log(tituloEncontrado) 
    }
}

//FILTER filter retorna siempre un array
//devuelve array con elemento filtrados o array vacío
//recorre el array de punta a punta siempre
function buscarPorAutor(arr){
    let autorBuscado = prompt("Ingrese el nombre del autor que está buscando")
    let busqueda = arr.filter((libro)=> libro.autor.toLowerCase() == autorBuscado.toLowerCase())
    if(busqueda.length == 0){
        console.log(`No hay coincidencias para el autor/a ${autorBuscado}`)
    }else{
        //lo muestro común el array
        console.log(busqueda)
        //para probar reutilizamos la function que muestra el array
        verCatalogo(busqueda)
    }

}

//SORT -- ATENCIÓN METODO QUE DESTRUYE (AFECTA) AL ARRAY ORIGINAL -- en el after lo seguimos
// //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// // https://davidyero.medium.com/ordenar-arreglo-de-objetos-por-propiedad-o-atributo-javascript-56f74fc48906

function ordenarMenorMayor(array){
        //copiamos array original // concat
        const menorMayor = [].concat(array)
        //ordena de menor a mayor
        menorMayor.sort((a,b) => a.precio - b.precio)
        verCatalogo(menorMayor)
}
function ordenarMayorMenor(arr){
    //ordenar de mayor a menor
    const mayorMenor = [].concat(arr)
    mayorMenor.sort((param1, param2)=>{
        return param2.precio - param1.precio
    })
    verCatalogo(mayorMenor)
}
function ordenarAlfabeticamenteTitulo(array){
    const ordenadoAlfabeticamente = [].concat(array)
     ordenadoAlfabeticamente.sort((a,b) => {
          if(a.titulo > b.titulo) {
            return 1
          }
          if (a.titulo < b.titulo) {
            return -1
          }
          // a must be equal to b
          return 0;
    })
    verCatalogo(ordenadoAlfabeticamente)
}
function ordenar(array){
    let opcion = parseInt(prompt(`
    1 - Ordenar de menor a mayor
    2 - Ordenar de mayor a menor
    3 - Ordenar alfabeticamente `))
    switch(opcion){
        case 1:
            ordenarMenorMayor(array)
        break
        case 2:
            ordenarMayorMenor(array)
        break
        case 3:
            ordenarAlfabeticamenteTitulo(array)
        break
        default:
            console.log(`${opcion} no es válida para ordenar`)
        break    
    }
}

//para agregar height a jhon en un array dinamico

var people = [  { name: "John", age: 30 },  { name: "Jane", age: 28 }];

for (var i = 0; i < people.length; i++) {
  if (people[i].name === "John") {
    people[i].height = 1.70;
    break;
  }
}
