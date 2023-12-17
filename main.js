


const productos = [
    {
        cantidad: 1,
        id:1,
        img: "./images/manzana.png",
        nombre: "Manzana",
        categoria: "fruta",
        precio: 100,
    },
    {
        cantidad: 1,
        id:2,
        img: "./images/banana.png",
        nombre: "Banana",
        categoria: "fruta",
        precio: 150,
    },
    {
        cantidad: 1,
        id:3,
        img: "./images/limones.png",
        nombre: "Limon",
        categoria: "fruta",
        precio: 180,
    },
    {
        cantidad: 1,
        id:4,
        img: "./images/pera.png",
        nombre: "Pera",
        categoria: "fruta",
        precio: 120,
    },
    {
        cantidad: 1,
        id:5,
        img: "./images/naranja.png",
        nombre: "Naranja",
        categoria: "fruta",
        precio: 90,
    },
    {
        cantidad: 1,
        id:6,
        img: "./images/cebolla.png",
        nombre: "Cebolla",
        categoria: "verdura",
        precio: 110,
    },
    {
        cantidad: 1,
        id:7,
        img: "./images/lechuga.jpg",
        nombre: "Lechuga",
        categoria: "verdura",
        precio: 200,
    },
    {
        cantidad: 1,
        id:8,
        img: "./images/Morron.jpg",
        nombre: "Morron",
        categoria: "verdura",
        precio: 250,
    },
    {
        cantidad: 1,
        id:9,
        img: "./images/tomate.jpg",
        nombre: "Tomate",
        categoria: "verdura",
        precio: 130,
    },
    {
        cantidad: 1,
        id:10,
        img: "./images/zanahoria.jpg",
        nombre: "Zanahoria",
        categoria: "verdura",
        precio: 170,
    },
    {
        cantidad: 1,
        id:11,
        img: "./images/aji molido.png",
        nombre: "Aji molido",
        categoria: "especia",
        precio: 150,
    },
    {
        cantidad: 1,
        id:12,
        img: "./images/comino.png",
        nombre: "Comino",
        categoria: "especia",
        precio: 160,
    },
    {
        cantidad: 1,
        id:13,
        img: "./images/oregano.png",
        nombre: "Oregano",
        categoria: "especia",
        precio: 170,
    },
    {
        cantidad: 1,
        id:14,
        img: "./images/pimenton.png",
        nombre: "Pimenton",
        categoria: "especia",
        precio: 180,
    },
    {
        cantidad: 1,
        id:15,
        img: "./images/pimienta.png",
        nombre: "Pimienta",
        categoria: "especia",
        precio: 170,
    },
]

// Genero carrito teniendo en cuenta el Local Storage

let carrito
const carritoLS = localStorage.getItem("Carrito")

if(carritoLS){
    carrito = JSON.parse(carritoLS)
} else { 
    carrito = []
}

// Creo funcion para renderizar mis productos y que se creen las cards necesarias aplicando DOM

let productoContainer = document.getElementById("productoContainer")

function renderCarrito (productos){
    productos.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML =   `<h3>${producto.nombre}</h3>
                            <img src="${producto.img}" alt="${producto.nombre}">
                            <p>Precio unitario: $${producto.precio}
                            <button class="agregarCarrito" id="${producto.id}">Agregar al carrito</button>`
        productoContainer.appendChild(card)
    })
    botonAgregarCarrito()
}

renderCarrito(productos)

// Creo funcion para agregar un producto al carrito y la llamo en la funcion renderCarrito, con condicional para evitar repeticiones de producto en nuevo array y en Local Storage 


function botonAgregarCarrito (){
    botonAgregar = document.querySelectorAll(".agregarCarrito")
    botonAgregar.forEach(button =>{
        button.onclick = (e) => {
            const idActual = e.currentTarget.id
            const productoBuscado = productos.find(producto => producto.id == idActual)

            const productoRep = carrito.some((productoRep) => productoRep.id === productoBuscado.id)

            if (productoRep){
                carrito.map((prod)=>{
                    if (prod.id === productoBuscado.id){
                        prod.cantidad++
                    }
                })
            } else {
                carrito.push(productoBuscado)
            }

            
            console.log(carrito)

            localStorage.setItem("Carrito", JSON.stringify(carrito))
            Toastify({
                text: "Producto agregado!!",
                duration: 2000,
                destination: "./carrito.html",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                background: "#E66A0E",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        }
    })
}


let filtrarProductos = (Boton) => {
    productoContainer.innerHTML = ""
    let arrayFiltrado = productos.filter(producto => producto.categoria == Boton)
    if (arrayFiltrado.length == 0){
        renderCarrito(productos)
    } else {
        renderCarrito(arrayFiltrado)
    }
    console.log(arrayFiltrado)
}

let botonesCategoria = document.getElementById("categorias")

botonesCategoria.addEventListener("click" , (e) => {
    let idBoton = e.target.id
    filtrarProductos(idBoton)
})