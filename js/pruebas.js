main.js
//PROYECTO:
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
    
}
//Instanciación de objetos -- respetamos orden y cantidad de atributos

const libro1 = new Libro(1,"Jorge Luis Borges","Aleph", 900, "AlephBorges.jpg")

const libro2 = new Libro(2,"Gabriel García Marquez","Cien años de Soledad", 4500, "CienSoledadMarquez.jpg")

const libro3 = new Libro(3,"Isabel Allende", "Paula", 2800, "PaulaAllende.jpg")

const libro4 = new Libro(4,"Jorge Luis Borges","Ficciones", 1400, "FiccionesBorges.jpg")

const libro5 = new Libro(5,"Mario Benedetti", "Andamios", 2200, "AndamiosBenedetti.jpg")

const libro6 = new Libro(6,"Mario Vargas Llosa", "La ciudad y los perros", 2000, "CiudadPerrosVargasLlosa.jpg")

//Agregar storage a nuestro 
//array de objetos:
let estanteria = []
if(localStorage.getItem("estanteria")){
    estanteria = JSON.parse(localStorage.getItem("estanteria"))
}else{
    //entra por primera vez
    console.log("Seteando stock de libros")
    estanteria.push(libro1,libro2,libro3,libro4,libro5,libro6)
    localStorage.setItem("estanteria", JSON.stringify(estanteria))
}
//Capturas nodos DOM:
let libros = document.getElementById("libros")
let guardarLibroBtn = document.getElementById("guardarLibroBtn")
// let verCatalogoBtn = document.getElementById("verCatalogo")
// let ocultarCatalogoBtn = document.getElementById("ocultarCatalogo")
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
let botonCarrito = document.getElementById("botonCarrito")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
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
//aplicar operador []
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []
console.log(productosEnCarrito)
function agregarAlCarrito(libro){
    // console.log(libro)
    //nivel lógica del array
    console.log(`El libro ${libro.titulo} de ${libro.autor} ha sido agregado. Vale ${libro.precio}`)
    productosEnCarrito.push(libro)
    console.log(productosEnCarrito)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    // cargarProductosCarrito(productosEnCarrito)
}
function cargarLibro(array){
    
    let inputAutor = document.getElementById("autorInput")
    let inputTitulo = document.getElementById("tituloInput")
    let inputPrecio = document.getElementById("precioInput")

    //creamos nuevo objeto 
    const libroNuevo = new Libro(array.length+1, inputAutor.value, inputTitulo.value, inputPrecio.value, "libroNuevo.jpg")
    console.log(libroNuevo)
    //sumarlo a estanteria
    array.push(libroNuevo)
    console.log(array)
    //guardar en localStorage
    localStorage.setItem("estanteria", JSON.stringify(array))
    mostrarCatalogo(array)

    //resetear input 
    inputAutor.value = ""
    inputTitulo.value = ""
    inputPrecio.value = ""
}

function buscarInfo(buscado, array){
    //método filter
    //si quiero que la búsqueda sea por coincidencia estricta ej:
    // (libro) => libro.autor.toLowerCase() == buscado.toLowerCase() || libro.titulo.toLowerCase() == buscado.toLowerCase()
    let busquedaArray = array.filter(
        (libro) => libro.autor.toLowerCase().includes(buscado.toLowerCase()) || libro.titulo.toLowerCase().includes(buscado.toLowerCase())
    ) 
    //condicional sino encuentra nada:
    // if(busquedaArray.length == 0){
    //     coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`
    //     mostrarCatalogo(busquedaArray)
    // }else{
    //     coincidencia.innerHTML = ""
    //     mostrarCatalogo(busquedaArray)

    // }

    //equivalente con ternario
    busquedaArray.length == 0 ? 
    (coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`, 
    mostrarCatalogo(busquedaArray)) 
    : 
    (coincidencia.innerHTML = "", 
    mostrarCatalogo(busquedaArray))
    //para anidar muuchas condiciones
}

//ordenar:
function ordenarMenorMayor(array){
    //copiamos array original // concat
    const menorMayor = [].concat(array)
    //ordena de menor a mayor
    menorMayor.sort((a,b) => a.precio - b.precio)
    mostrarCatalogo(menorMayor)
}
function ordenarMayorMenor(arr){
    //ordenar de mayor a menor
    const mayorMenor = [].concat(arr)
    mayorMenor.sort((param1, param2)=>{
        return param2.precio - param1.precio
    })
    mostrarCatalogo(mayorMenor)
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
    mostrarCatalogo(ordenadoAlfabeticamente)
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
                         <button class= "btn btn-danger" id="botonEliminar"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
        `
    })
}
//EVENTOS:

guardarLibroBtn.addEventListener("click", ()=>{
    cargarLibro(estanteria)
})



buscador.addEventListener("input", ()=>{
    // console.log(buscador.value)
    buscarInfo(buscador.value, estanteria)
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
//código:
mostrarCatalogo(estanteria)

//CLASE 12 OPERADORES AVANZADOS

//operador ternario: 
let num = 8
if(num == 4){
    console.log("El num es 4")
}else{
    console.log("El num NO es 4")
}

//condición ? lo que se ejecuta si es true : lo que se ejecuta si es false
num == 4 ? console.log("El num es 4. Con ternario") : console.log("El num NO es 4. Con ternario")

//operador && 
let carrito = ["elemento", "string"]
carrito.length == 0 && console.log("EL carrito está vacío")

// operador OR || undefined, null, "", NaN, 0 y false
//falsy: undefined, null, "", NaN, 0 y false
//nullish undefined y null
//find cuando no encuentra me devuelve undefined
let buscado = estanteria.find((book) => book.titulo == "Andamios") ?? "No tenemos ese libro en stock"
// if(buscado == undefined){

// } 
// console.log(buscado)
// condicion ? true  : false

//acceso condicional:
console.log(libro1.titulo || "No tiene titulo")
let enciclopedia23
//debemos utilizar el ?
console.log(enciclopedia23?.titulo || "No tiene titulo")

//desestructurar un object
//el nombre debe coincidir con el atributo
let {autor, titulo, imagen, id, precio, editorial} = libro5
console.log(autor)
console.log(titulo)

console.log(precio)
console.log(imagen)
console.log(id)
//esto da undefined, ya que no hay atributo con ese nombre
console.log(editorial)

//desestructurar con ALIAS
//primero nombre original del atributo : nombre nuevo
let {autor: author, titulo: title, precio: price}= libro4
console.log(author)
console.log(title)
console.log(price)
// se puede reasignar el valor y no modificar object original
title = "Libro de arena"
// libro4.titulo = "Libro de arena"
console.log(title)
console.log(libro4)
console.log("/////")
//Desestructurar array:
let [ ,a, b, , ,c] = estanteria
console.log(a)
console.log(b)
console.log(c)

//spread
console.log("spread array")
console.log(estanteria)
//... spread
console.log(...estanteria)

let numeros = [25, 19, 7, 1993, 5200, 6, 87,-5]
console.log(numeros)
console.log(...numeros)
// suma(num1, num2 )
console.log(Math.min(...numeros))


//toda la info de libro + editorial
let superLibro1 = {
    ...libro1,
    editorial: "Sudamericana",
    cantPag : 564
}
console.log(superLibro1)

function calcularTotal(...precios){
    console.log(precios)
    //agregar suma cada elemento
    return precios.reduce((acc, numeroSuma) => acc + numeroSuma, 0)
}
console.log(calcularTotal(3, 8, 9, 15))

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


function verCatalogo(array){
    console.log("Bienvenido! Nuestro catalogo es:")
    array.forEach((libro)=>{
        console.log(libro.id, libro.titulo, libro.precio, libro.autor)
    })
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

function menu(){
    let salirMenu = false
    do{
        salirMenu = preguntarOpcion(salirMenu)
    }while(!salirMenu)
} 

function preguntarOpcion(salir){
    let opcionIngresada = parseInt(prompt(`Ingrese la opción deseada
           1 - Agregar libro
           2 - Borrar libro
           3 - Consultar catálogo
           4 - Encontrar por titulo:
           5 - Buscar libros de un mismo autor:
           6 - Ordenar libros:
           0 - Salir del menu`))
    
        switch(opcionIngresada){
            case 1:
                agregarLibro()
            break
            case 2:
                //borrar libro
                eliminarLibro(estanteria)
            break
            case 3:
                //ver catalogo
                verCatalogo(estanteria)
            break
            case 4:
                //buscar por titulo
                buscarPorTitulo(estanteria)
            break
            case 5:
                //buscar por autor
                buscarPorAutor(estanteria)
            break
            case 6:
                //ordenar
                ordenar(estanteria)
            break
            case 0:
                console.log("gracias por utilizar nuestra app")
                salir = true
                return salir
            break
            default:
                console.log("Ingrese una opción correcta")
            break
        }
}

//CÓDIGO
// menu()