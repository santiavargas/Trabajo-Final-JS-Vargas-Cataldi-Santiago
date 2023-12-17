// Recupero la informacion guardada en el Locar Storage para crear nuevo array en esta pagina

let carritoCompras = localStorage.getItem("Carrito")
carritoCompras = JSON.parse(carritoCompras)

// Creo funcion para renderizar mis productos y que se creen las cards necesarias aplicando DOM

let carritoContainer = document.getElementById("carritoContainer")

function renderCarrito(productos){
    carritoContainer.innerHTML=""
    productos.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML =`<img src="${producto.img}" alt="${producto.nombre}">
                        <h2>${producto.nombre}</h2>
                        <p>Cantidad: ${producto.cantidad}</p>
                        <p>Precio total $${producto.precio * producto.cantidad}
                        <button class="eliminarCarrito" id="${producto.id}">Eliminar producto</button>`
        carritoContainer.appendChild(card)
    
    })
    botonEliminarCarrito()
}



function botonEliminarCarrito(){
    botonEliminar = document.querySelectorAll(".eliminarCarrito")
    botonEliminar.forEach(button =>{
        button.onclick = (e) => {
            const idActual = e.currentTarget.id
            const productoElim = carritoCompras.find(producto => producto.id == idActual)

            const carritoMod = carritoCompras.filter((prod) => prod !== productoElim)

            carritoCompras = carritoMod
            renderCarrito(carritoCompras)
            localStorage.setItem("Carrito", JSON.stringify(carritoCompras))
            
        }
    }) 
}

renderCarrito(carritoCompras)

// Creo funcion para vaciar el carrito

let vaciarCarrito = document.getElementById("vaciarCarrito")

vaciarCarrito.onclick = () =>{
    Swal.fire({
        title: "Seguro desea vaciar el carrito?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Si",
        denyButtonText: `No`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("Se vació el carrito!", "", "success");
            localStorage.clear()
            carritoCompras = []
            carritoContainer.innerHTML = `<p>No hay elementos en el carrito</p>`
        } else if (result.isDenied) {
            Swal.fire("Carrito conservado", "", "info");
        }
    });
    

}


let botonComprar = document.getElementById("botonComprar")

botonComprar.onclick = () =>{
    if(carritoCompras.length === 0){
        Swal.fire({
            title: "Compra no realizada",
            text: "Debe tener por lo menos un producto en el carrito",
            icon: "error"
        });
    } else {
        Swal.fire({
            title: "Compra realizada!",
            text: "Gracias por comprar con nosotros",
            icon: "success"
        });
    }
    console.log(carritoCompras)
    
}