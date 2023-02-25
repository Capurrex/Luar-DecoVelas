
//PROYECTO:

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
let formAgregarLibro = document.getElementById("formAgregarLibro")
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
let productosEnCarrito = []
if(localStorage.getItem("carrito")){
    
    for(let libro of JSON.parse(localStorage.getItem("carrito"))){
        //para conservar la cantidad del storage
        let cantStorage = libro.cantidad
        let libroCarrito = new Libro(libro.id, libro.autor, libro.titulo, libro.precio, libro.imagen)
        libroCarrito.cantidad = cantStorage
        productosEnCarrito.push(libroCarrito)
    }
    console.log(productosEnCarrito)
}else{
    productosEnCarrito = []
}

// let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []

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

    formAgregarLibro.reset()
    Toastify({
        text: `Usted ha agregado el libro ${libroNuevo.titulo} al stock`,
        gravity: "top",
        position: "right",
        style:{
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "black"
        },
        duration: 2000
      }).showToast()
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
                         <p class="card-text">Total de unidades: ${productoEnCarrito.cantidad}</p>
                         <p class="card-text">SubTotal: ${productoEnCarrito.precio * productoEnCarrito.cantidad}</p>
                         <button class= "btn btn-success" id="botonSumarUnidad${productoEnCarrito.id}"><i class=""></i>+1</button>
                         <button class= "btn btn-danger" id="botonEliminarUnidad${productoEnCarrito.id}"><i class=""></i>-1</button>
                         <button class= "btn btn-danger" id="botonEliminar${productoEnCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
        `
        
    })

    array.forEach((productoEnCarrito)=> {
        //FOR EACH PARA AGREGARLE FUNCTIONS A LOS ELEMENTOS DE LA CARDS DEL CARRITO
        //eliminar todo el producto
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
        
        //SUMAR UNIDAD
        document.getElementById(`botonSumarUnidad${productoEnCarrito.id}`).addEventListener("click", ()=>{
            
            productoEnCarrito.sumarUnidad()
            localStorage.setItem("carrito", JSON.stringify(array))
            cargarProductosCarrito(array)
        })

        //ELIMINAR UNIDAD
        document.getElementById(`botonEliminarUnidad${productoEnCarrito.id}`).addEventListener("click", ()=>{
            let eliminar = productoEnCarrito.restarUnidad()
            if(eliminar < 1){
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
            }else{
                localStorage.setItem("carrito", JSON.stringify(array))
            }
            cargarProductosCarrito(array)
        })
    })

    calcularTotal(array)
}
function calcularTotal(array){
    let total = array.reduce((acc, productoCarrito)=> acc + (productoCarrito.precio * productoCarrito.cantidad) ,0)
    // console.log("Con reduce " +total)

    // let acumulador = 0
    // for(let libro of array){
    //     acumulador = acumulador + libro.precio
    // }
    // console.log("Con for of " + acumulador)
    //condicion ? true : false
    total == 0 ? precioTotal.innerHTML = `No hay productos en el carrito` :
    precioTotal.innerHTML = `El total del carrito es <strong>${total}</strong>`

    return total
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
            let finalizarTotal = calcularTotal(productosEnCarrito)
            Swal.fire({
                title: 'Compra realizada',
                icon: 'success',
                confirmButtonColor: 'green',
                text: `Muchas gracias por su compra ha adquirido nuestros productos el día ${fechaMostrar} a las ${fechaHoy.toLocaleString(DateTime.TIME_SIMPLE)}. El total es de ${finalizarTotal} `,
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
